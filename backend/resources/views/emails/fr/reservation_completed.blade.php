<html lang={{ $language }}>

<body>
    <div class="container">
        <div class="d-flex flex-column">
            <p class="mb-2">Bonjour {{ $customerForm->first_name }},</p>
            <p class="mb-2">Merci d'avoir réservé le cours {{ $eventName }} chez <strong>Voile 4 vents</strong>!</p>
            <p class="mb-2">Nous confirmons votre réservation pour les dates suivantes
            <ul>
                @foreach ($reservation->events as $event)
                    <li>
                        {{ date('d-m-Y', strtotime($event->start)) }}
                    </li>
                    @if ($event->checkIfSaturday())
                        <li>
                            {{ date('d-m-Y', strtotime($event->end)) }}
                        </li>
                    @endif
                @endforeach
            </ul>
            </p>
            <p class="mb-2">Le cours aura lieu au 20436 chemin Lakeshore, Baie-D'Urfe, Québec H9X 1P7</p>
            <p class="mb-5">Si vous avez des questions, vous pouvez visiter notre <a
                    href="https://voile4vents.ca/{{ $language }}/faq">FAQ</a> ou <a
                    href="https://voile4vents.ca/{{ $language }}/contact-us">nous contacter</a> directement par
                téléphone ou par courriel</p>
            <p class="mb-2">Il est possible que nous devions décaler votre cours en raison de divers facteurs. Si cela
                est le cas, nous entrerons rapidement en contact avec vous.</p>

            <p class="mb-2">À très bientôt sur l'eau, </p>
            <p class="mb-2">Capi Pier'eau</p>
            <p class="mb-2">Instructeur </p>
        </div>
    </div>
</body>

</html>
