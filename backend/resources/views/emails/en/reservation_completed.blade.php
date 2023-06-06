<html lang={{ $language }}>

<body>
    <div class="container">
        <div class="d-flex flex-column">
            <p class="mb-2">Hi {{ $customerForm->first_name }},</p>
            <p class="mb-2">Thank you for booking the {{ $eventName }} course at <strong>Voile 4 vents</strong>!</p>
            <p class="mb-2">We confirm your reservation for these days
            <ul>
                @foreach ($$reservation->events as $event)
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
            <p class="mb-2">The course will take place at 20436 chemin Lakeshore, Baie-D'Urfe, Québec H9X 1P7</p>
            <p class="mb-5">If you have any questions, please visit our <a
                    href="https://voile4vents.ca/{{ $language }}/faq">FAQ</a> or <a
                    href="https://voile4vents.ca/{{ $language }}/contact-us">contact us</a> directly by phone or
                email</p>
            <p class="mb-2">It is possible that we will have to move the date of your course due to various factors. If
                that's the case, we will contact your rapidly in order to find a better date.</p>

            <p class="mb-2">See you soon,</p>
            <p class="mb-2">Instructor</p>
            <p class="mb-2">Capi Pier'eau</p>
        </div>
    </div>
</body>

</html>
