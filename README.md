# Contributing Guide — CLH Site

Denne guide beskriver den lette måde at arbejde med branches og pull requests (PRs) i dette repo.

## 1) Branch-strategi
- **Ingen direkte pushes til `main`** (beskyttet gren).
- Arbejd altid fra en **feature branch**:
  - `feat/<kort-beskrivelse>` – ny funktion/indhold  
  - `fix/<kort-beskrivelse>` – fejlrettelse  
  - `chore/<kort-beskrivelse>` – opsætning/vedligehold (CI, lint, deps)
  - `docs/<kort-beskrivelse>` – dokumentation  
  - `hotfix/<kort-beskrivelse>` – akut rettelse direkte til release

**Eksempler**
feat/home-hero-copy
fix/og-image-path
chore/ga4-events
docs/contributing


## 2) Commits
Brug korte, men meningsfulde beskeder (gerne [Conventional Commits]-stil, men uden at være religiøs).
- God: `feat: add thanks page and link from newsletter`
- Dårlig: `updates`

Små, hyppige commits > store “dump”-commits.

## 3) Pull Request (PR)
1. Push din branch og opret en PR mod `main`.
2. **Titel**: kort og præcis (samme ånd som commit-overskrift).
3. **Beskrivelse**: _hvad_ og _hvorfor_ (screenshots, før/efter, links).
4. **Checklist** (tilpas efter behov):
   - [ ] Bygger/åbner lokalt uden fejl (statisk site).
   - [ ] Link/knapper testet (især newsletter, LinkedIn, contact).
   - [ ] SEO/meta: title/description/OG-image ok (ved behov).
   - [ ] Robots/sitemap påvirkes ikke (eller er opdateret).
   - [ ] Design matcher eksisterende stil (ingen utilsigtede ændringer).
5. Få 1 approval (eller selv-review hvis du arbejder solo) og **resolve** alle kommentarer.

> **Bemærk:** Branch protection kræver “linear history” – brug **Squash & merge** når du merger PR’en.

## 4) Merge & oprydning
- Merge PR med **Squash & merge** (bevarer pæn historik).
- Slet branch efter merge (GitHub tilbyder det automatisk).
- Tjek live-site (prod). Purge cache på specifikke filer hvis nødvendigt (f.eks. `robots.txt`, `sitemap.xml`).

## 5) Hotfix-flow (akut)
- Opret `hotfix/<beskrivelse>`.
- Mindste mulige ændring → PR → squash & merge.
- Tjek prod, og opret evt. opfølgende `feat/`-branch til refaktorering.

## 6) Stil & design
- Vi bevarer det aftalte grafiske udtryk. Ingen CSS/markup-ændringer uden klart formål.
- Følg eksisterende semantik/klasser i `assets/style.css`.
- **Sprog**: Alt brugerindhold er **engelsk** (medmindre andet er aftalt).

## 7) SEO & deling (kort)
- Bevar/tilpas `<title>`, `<meta name="description">`, canonical og Open Graph-tags.
- `assets/og-image.png` er standard. Skift kun efter aftale.

## 8) GA4-events (kort)
- Klik-events sendes via `gtag()` (f.eks. `click_join_newsletter`, `click_contact_email`, `click_linkedin`).
- Nye events → aftal navn og implementering.

---

**Opsummering**
- Branch fra `main` → små commits → PR → review/approve → **Squash & merge** → slet branch → tjek prod.

[Conventional Commits]: https://www.conventionalcommits.org/

