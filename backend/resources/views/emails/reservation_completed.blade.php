<!-- Stored in resources/views/layouts/app.blade.php -->

<html lang="fr">
    <body>
        <div class="container">
            Hi {{ $customerForm->first_name }}
            Type: {{ $reservation->type }}
        </div>
    </body>
</html>
