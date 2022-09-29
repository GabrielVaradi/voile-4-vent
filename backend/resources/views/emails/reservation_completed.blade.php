<html lang="fr">
    <body>
        <div class="container">
            {{ $language == 'en' ? 'english' : 'french'}}
            Hi {{ $customerForm->first_name }}
            Type: {{ $reservation->type }}
        </div>
    </body>
</html>
