<!-- pipeline_applied: { audit_score: pending_anis_review, audit_skill: great-web-copy/audit-copy, humanizer: pending_anis_review } -->

# linkedin-carousel-gen, SolidScale fork

[![CI](https://github.com/assinscreedFC/linkedin-carousel-gen/actions/workflows/ci.yml/badge.svg)](https://github.com/assinscreedFC/linkedin-carousel-gen/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Fork brandé navy, cobalt, azur de [Slashgear/linkedin-carousel-gen](https://github.com/Slashgear/linkedin-carousel-gen). Produit les carrousels LinkedIn de l'agence SolidScale (palette du logo, S3 Framework, pipeline copy 6 couches, anti AI slop). Le rendu reste Bun + React + Satori, comme upstream.

## Pourquoi ce fork

L'upstream Slashgear est généraliste : 7 thèmes, 12 slides, anglais. Ce fork :

- Verrouille la palette aux 3 couleurs navy, cobalt, azur de `DESIGN.md` (allowlist enforcée par tests).
- Restreint à 4 templates métier SolidScale : Hook, Stat, FrameworkStep, CTA.
- Structure les carrousels selon Caleb (8 à 10 slides), template `FrameworkStep` mappé sur le S3 Framework (Scan, Solve, Scale).
- Découple skill et CLI via un JSON spec versionné (D-07).
- Passe chaque texte au pipeline copy 6 couches `solidscale-voice` AVANT rendu (audit qualité, humanizer, marker `pipeline_applied`).

## Prérequis

- Bun >= 1.3
- Node >= 22 (pour le pont portfolio `pnpm carousel:gen`)
- Git, gh CLI
- macOS, Linux ou Windows pour l'écriture des specs. La CI tourne sur ubuntu-latest pour stabiliser les snapshots (Pitfall 4, voir `tests/snapshots/README.md`).

## Installation

```bash
git clone https://github.com/assinscreedFC/linkedin-carousel-gen.git
cd linkedin-carousel-gen
bun install
bun test
```

## Architecture

| Dossier ou fichier | Rôle |
| ------------------ | ---- |
| `src/tokens.ts` | Palette navy, cobalt, azur (allowlist DESIGN.md, single source de vérité) |
| `src/spec/schema.ts` | Contrat JSON spec (Zod). Découpe skill / CLI (D-07) |
| `src/slides/solidscale/` | 4 templates : Hook, Stat, FrameworkStep, CTA |
| `src/render/` | Pipeline Satori, resvg, pdf-lib |
| `src/cli/gen.ts` | Entrée CLI `bun run gen` |
| `scripts/check-no-em-dash.ts` | Garde anti em dash (CLAUDE.md, signal IA #1) |
| `examples/` | Specs JSON de référence (S3 Framework, adoption IA France) |
| `tests/` | schema, tokens allowlist, em-dash, templates snapshots, e2e |

## Utilisation

```bash
# Format portrait par défaut, 1200x1500 (D-04, max engagement LinkedIn doc 2025)
bun run gen examples/france-adoption-ia-generative.spec.json
# Produit output/carousels/2026-06-08-france-adoption-ia-generative.pdf

# Format square pour cross-post Instagram, 1080x1080
bun run gen examples/france-adoption-ia-generative.spec.json --square
```

Codes de sortie :

| Code | Cause |
| ---- | ----- |
| 0 | Succès |
| 2 | Arguments invalides (usage) |
| 3 | Spec invalide (Zod) |
| 4 | Em dash détecté dans la spec (anti AI slop) |
| 5 | PDF généré > 100 MB (CAROUSEL-07) |

## Intégration skill SolidScale

Le rendu n'est qu'un étage du processus complet. Le contenu publié sur LinkedIn passe par 6 couches, dans cet ordre :

1. Archive Notion : consulter l'index des posts pour cohérence sujets et callbacks.
2. Caleb : structurer le récit (Hook, Problem, Journey, Lesson, CTA, About).
3. animalz : brief court par slide.
4. Skill plateforme `solidscale-carousel` : écrit le JSON spec dans `output/carousels/{slug}.spec.json`. Mapping templates SolidScale (Hook, Stat sourcée, FrameworkStep S3, CTA audit). Le skill compose le pipeline `solidscale-voice`.
5. Audit qualité (`great-web-copy/audit-copy`) : score >= 60 obligatoire. Itérer sinon.
6. Humanizer : passe anti IA sur le draft, puis review manuelle Anis (couche 6) AVANT publication.

Le CLI Bun consomme le JSON spec validé et rend tel quel. Sans re-vérification (D-08).

Côté portfolio, le script optionnel `pnpm carousel:gen <spec>` shell-out vers ce fork via la variable `CAROUSEL_REPO_PATH`.

## Templates

### Hook

Slide de couverture. Champs : `title` (max 140), `eyebrow` (max 60, optionnel). Sert d'accroche, vocabulaire S3 ou question directe à dirigeant d'entreprise.

### Stat

Chiffre source de vérité. Champs : `figure` (ex. "44%"), `label` (contexte court), `source` (URL obligatoire). Tout chiffre est sourcé, jamais inventé (cf. mémoire `feedback_chiffres_source_verite.md`).

### FrameworkStep

Étape du S3 Framework. Champs : `step` (enum Scan, Solve, Scale), `headline`, `body`. Trois slides FrameworkStep maximum par carrousel pour respecter le pacing Caleb.

### CTA

Appel final vers l'audit gratuit 30 min. Champs : `headline`, `cta_label` (ex. "Audit gratuit 30 min"), `url` (défaut `https://solidscale.tech`). Jamais de lien Calendly nu : on passe toujours par solidscale.tech.

## Format JSON spec

```json
{
  "slug": "s3-framework",
  "date": "2026-06-08",
  "format": "portrait",
  "slides": [
    { "template": "Hook", "title": "..." },
    { "template": "Stat", "figure": "55%", "label": "...", "source": "https://..." },
    { "template": "FrameworkStep", "step": "Scan", "headline": "...", "body": "..." }
  ],
  "pipeline_applied": {
    "audit_score": 75,
    "audit_skill": "great-web-copy/audit-copy",
    "humanizer": "yes",
    "humanizer_date": "2026-06-01"
  }
}
```

Validation Zod stricte dans `src/spec/schema.ts`. Le marker `pipeline_applied` est traçable, écrit par le skill `solidscale-carousel` après couche 5.

## Tests

```bash
bun test                        # Toute la suite
bun test tests/tokens           # Allowlist palette enforcée
bun test tests/em-dash          # Anti AI slop
bun test tests/templates        # Snapshots Satori des 4 templates
bun test tests/e2e              # Pipeline complète sur la fixture
```

Snapshots PNG dans `tests/snapshots/`. À régénérer sur Linux uniquement (Pitfall 4) via la CI ubuntu-latest, jamais en local Windows ou macOS.

## CI

GitHub Actions verrouillée sur ubuntu-latest (`.github/workflows/ci.yml`) :

- bun install (frozen-lockfile)
- typecheck, lint, format check
- bun test (schema + tokens + em-dash + templates + e2e)
- `bun run check:copy` sur README et exemples
- smoke E2E : `bun run gen examples/france-adoption-ia-generative.spec.json`
- garde taille : PDF > 10 KB et < 100 MB
- PDF artifact uploadé pour inspection (rétention 7 jours)

## Workflow recommandé

1. Brief sujet, vocabulaire S3, audience entreprise.
2. Lire l'archive Notion des posts LinkedIn (callbacks, sujets déjà traités).
3. Skill `solidscale-carousel` invoqué : produit le JSON spec après couches 1 à 5 de `solidscale-voice`.
4. CLI : `pnpm carousel:gen output/carousels/{slug}.spec.json`.
5. Review Anis sur le PDF (couche 6). Itérer si besoin.
6. Publication LinkedIn (carrousel document). Caption passée par `solidscale-voice`. CTA en commentaire #1 vers solidscale.tech.
7. Archive Notion mise à jour (statut PUBLIÉ, URL, hook, callbacks).

## License

MIT, cohérent avec l'upstream Slashgear. Voir `LICENSE`. Les ajouts SolidScale (templates, tokens, pipeline) restent MIT.

## Remerciements

Upstream : [Slashgear/linkedin-carousel-gen](https://github.com/Slashgear/linkedin-carousel-gen). Le rendu Satori, la structure React et le packaging Bun viennent de là. Le travail SolidScale ajoute le brand, la palette verrouillée, les 4 templates métier et l'intégration pipeline copy.
