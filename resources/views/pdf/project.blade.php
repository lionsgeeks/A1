<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $project->title }} - PDF</title>
</head>
<body>
    @include('components.pdf.project', ['project' => $project, 'images' => $images])
</body>
</html>


