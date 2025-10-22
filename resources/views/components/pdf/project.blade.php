<style>
    @page { margin: 24px; }
    body { font-family: DejaVu Sans, sans-serif; color: #111; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .brand { font-size: 18px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; }
    .title { font-size: 26px; line-height: 1.2; font-weight: 700; margin: 6px 0 2px; }
    .subtitle { font-size: 12px; color: #555; }
    .meta { margin-top: 8px; font-size: 12px; color: #333; }
    .chip { display: inline-block; padding: 4px 8px; border-radius: 999px; font-size: 10px; color: #fff; margin-right: 6px; }
    .hero { margin: 12px 0 16px; }
    .hero img { width: 100%; height: auto; border-radius: 8px; }
    .section { margin-top: 16px; }
    .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
    .grid { display: table; width: 100%; border-collapse: separate; border-spacing: 12px 0; }
    .grid-col { display: table-cell; vertical-align: top; width: 50%; }
    .kv { margin-bottom: 8px; }
    .kv-label { font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: .5px; }
    .kv-value { font-size: 12px; color: #111; font-weight: 600; }
    .paragraph { font-size: 12px; line-height: 1.5; white-space: pre-line; }
    .gallery { margin-top: 8px; }
    .thumb { width: 100%; height: auto; border-radius: 6px; margin-bottom: 8px; }
    .footer { position: fixed; bottom: 16px; left: 24px; right: 24px; font-size: 10px; color: #777; display: flex; justify-content: space-between; }
    .hr { height: 1px; background: #eee; border: 0; margin: 12px 0; }
</style>

<div class="header">
    <div class="brand" style="display:flex; align-items:center; gap:8px;">
        @if(!empty($logoDataUri))
            <img src="{{ $logoDataUri }}" alt="Atelier A1" style="height:28px; width:auto;"/>
        @endif
        <span>Atelier A1</span>
    </div>
    <div class="subtitle">Fiche Projet</div>
</div>
<hr class="hr"/>

<div>
    <div style="margin-bottom:6px;">
        @php
            $categories = ($project->categories ?? []) ?: (($project->category ?? null) ? [ $project->category ] : []);
        @endphp
        @foreach($categories as $cat)
            @php $bg = $cat->color ?? '#a3845b'; @endphp
            <span class="chip" style="background: {{ $bg }};">{{ $cat->name ?? 'Sans catégorie' }}</span>
        @endforeach
    </div>
    <div class="title">{{ $project->title }}</div>
    <div class="meta">
        @if($project->location) {{ $project->location }} @endif
        @if($project->year) • {{ $project->year }} @endif
        @if($project->achievement_status) • {{ $project->achievement_status }} @endif
    </div>
</div>

@if(count($images) > 0)
    <div class="hero">
        <img src="{{ $images[0] }}" alt="{{ $project->title }}" />
    </div>
@endif

<div class="section">
    <div class="section-title">Aperçu</div>
    @if($project->description)
        <div class="paragraph">{{ $project->description }}</div>
    @else
        <div class="paragraph">Aucune description.</div>
    @endif
</div>

<div class="section">
    <div class="section-title">Détails</div>
    <div class="grid">
        <div class="grid-col">
            @if($project->client_name)
                <div class="kv"><div class="kv-label">Maîtrise d'Ouvrage</div><div class="kv-value">{{ $project->client_name }}</div></div>
            @endif
            @if($project->surface_area)
                <div class="kv"><div class="kv-label">Surface</div><div class="kv-value">{{ $project->surface_area }}</div></div>
            @endif
            @if($project->project_cost)
                <div class="kv"><div class="kv-label">Montant des Travaux</div><div class="kv-value">{{ $project->project_cost }}</div></div>
            @endif
        </div>
        <div class="grid-col">
            @if($project->start_year || $project->end_year)
                <div class="kv"><div class="kv-label">Période</div><div class="kv-value">{{ $project->start_year ?? '----' }} - {{ $project->end_year ?? '----' }}</div></div>
            @endif
            @if($project->duration_months)
                <div class="kv"><div class="kv-label">Durée</div><div class="kv-value">{{ $project->duration_months }} mois</div></div>
            @endif
            @if($project->status)
                <div class="kv"><div class="kv-label">Statut</div><div class="kv-value">{{ $project->status }}</div></div>
            @endif
        </div>
    </div>
</div>

@if(count($images) > 1)
    <div class="section">
        <div class="section-title">Galerie</div>
        <div class="gallery">
            @foreach(array_slice($images, 1) as $img)
                <img class="thumb" src="{{ $img }}" alt="{{ $project->title }}"/>
            @endforeach
        </div>
    </div>
@endif

<div class="footer">
    <div>© {{ date('Y') }} Atelier A1</div>
    <div>{{ config('app.url') }}</div>
</div>


