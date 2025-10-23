<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>{{ $project->title }} - PDF</title>
    <style>
        @page {
            size: A4;
            margin: 8mm;
        }

        * { box-sizing: border-box; }

        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 11px;
            color: #2c3e50;
            margin: 0;
            padding: 0;
            line-height: 1.4;
            background: #fff;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
            padding: 15px 0;
            border-bottom: 3px solid #3498db;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .brand {
            font-size: 20px;
            font-weight: 800;
            color: #2c3e50;
            letter-spacing: 3px;
            margin-bottom: 8px;
            text-transform: uppercase;
        }

        .title {
            font-size: 24px;
            font-weight: 900;
            color: #2c3e50;
            margin: 10px 0;
            line-height: 1.1;
        }

        .meta {
            font-size: 11px;
            color: #7f8c8d;
            margin-bottom: 12px;
            font-weight: 600;
        }

        .chip {
            background: #3498db;
            color: white;
            padding: 5px 10px;
            font-size: 9px;
            border-radius: 15px;
            margin-right: 6px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: inline-block;
            margin-bottom: 5px;
        }

        .hero {
            margin: 20px 0;
            text-align: center;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 6px 15px rgba(0,0,0,0.2);
        }

        .hero img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            object-position: center;
            display: block;
        }

        .content-row {
            display: table;
            width: 100%;
            border-collapse: separate;
            border-spacing: 20px 0;
            margin: 20px 0;
        }

        .content-left {
            display: table-cell;
            width: 70%;
            vertical-align: top;
            padding-right: 15px;
        }

        .content-right {
            display: table-cell;
            width: 30%;
            vertical-align: top;
            padding-left: 15px;
        }

        .description-section {
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 5px solid #3498db;
            padding: 15px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .technical-section {
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 5px solid #3498db;
            padding: 15px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .section-title {
            font-size: 13px;
            font-weight: 800;
            color: #2c3e50;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .paragraph {
            font-size: 11px;
            line-height: 1.6;
            color: #34495e;
            text-align: justify;
        }

        .kv {
            margin-bottom: 8px;
            padding: 5px 0;
            border-bottom: 1px dotted #bdc3c7;
        }

        .kv-label {
            font-size: 9px;
            color: #7f8c8d;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .kv-value {
            font-size: 11px;
            font-weight: 800;
            color: #2c3e50;
            margin-top: 3px;
        }

        .gallery-section {
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 5px solid #3498db;
            padding: 15px;
            margin: 20px 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .gallery {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 10px;
        }

        .gallery img {
            width: 65px;
            height: 50px;
            object-fit: cover;
            border-radius: 4px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
            flex-shrink: 0;
            border: 2px solid #fff;
        }

        .footer {
            position: fixed;
            bottom: 6mm;
            left: 8mm;
            right: 8mm;
            font-size: 9px;
            text-align: center;
            color: #95a5a6;
            padding: 8px;
            border-top: 2px solid #ecf0f1;
            background: #f8f9fa;
            font-weight: 600;
        }

        .content-wrapper {
            margin-bottom: 20mm;
        }
    </style>
</head>
<body>
    <div class="content-wrapper">
        <div class="header">
            <div class="brand">ATELIER A1</div>
            <div class="title">{{ $project->title }}</div>
            <div class="meta">
                @if($project->location) {{ $project->location }} @endif
                @if($project->year) • {{ $project->year }} @endif
                @if($project->achievement_status) • {{ $project->achievement_status }} @endif
            </div>
            <div>
                @php $categories = ($project->categories ?? []) ?: (($project->category ?? null) ? [ $project->category ] : []); @endphp
                @foreach($categories as $cat)
                    <span class="chip">{{ $cat->name ?? 'Sans catégorie' }}</span>
                @endforeach
            </div>
        </div>

        @if(count($images) > 0)
            <div class="hero">
                @php $mainImage = collect($images)->firstWhere('type', 'main'); @endphp
                @if($mainImage)
                    <img src="{{ $mainImage['data'] }}" alt="{{ $project->title }}" />
                @endif
            </div>
        @endif

        <div class="content-row">
            <div class="content-left">
                <div class="description-section">
                    <div class="section-title">Description du Projet</div>
                    <div class="paragraph">{{ $project->description ?? 'Aucune description disponible.' }}</div>
                </div>
            </div>
            
            <div class="content-right">
                <div class="technical-section">
                    <div class="section-title">Informations Techniques</div>
                    @if($project->client_name)
                        <div class="kv"><div class="kv-label">Maître d'Ouvrage</div><div class="kv-value">{{ $project->client_name }}</div></div>
                    @endif
                    @if($project->surface_area)
                        <div class="kv"><div class="kv-label">Surface</div><div class="kv-value">{{ $project->surface_area }}</div></div>
                    @endif
                    @if($project->project_cost)
                        <div class="kv"><div class="kv-label">Montant des Travaux</div><div class="kv-value">{{ $project->project_cost }}</div></div>
                    @endif
                    @if($project->start_year || $project->end_year)
                        <div class="kv"><div class="kv-label">Période de Réalisation</div><div class="kv-value">{{ $project->start_year ?? '----' }} - {{ $project->end_year ?? '----' }}</div></div>
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
            <div class="gallery-section">
                <div class="section-title">Galerie d'Images</div>
                <div class="gallery">
                    @php $galleryImages = collect($images)->where('type', 'gallery'); @endphp
                    @foreach($galleryImages as $img)
                        <img src="{{ $img['data'] }}" alt="{{ $project->title }}"/>
                    @endforeach
                </div>
            </div>
        @endif
    </div>

    <div class="footer">
        © {{ date('Y') }} Atelier A1 - Architecture & Design | {{ config('app.url') }}
    </div>

</body>
</html>