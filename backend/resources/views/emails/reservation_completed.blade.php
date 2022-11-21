<html lang="fr">
    <body>
        <div class="container">
            {{ $language == 'en' ? 'english' : 'french'}}
            Hi {{ $customerForm->first_name }}
            Type: {{ $reservation->type }}

            Here's what you need to know :

            Don't fall into water
        </div>
    </body>
</html>
