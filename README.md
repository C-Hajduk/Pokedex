# Pokedex

Dieses Projekt ist ein interaktiver Pokédex, der Pokémon-Daten aus einer API lädt und visuell darstellt. Ziel ist es, eine ansprechende, responsive Webanwendung zu entwickeln, die moderne Frontend-Prinzipien berücksichtigt.

🚀 Features

    Pokémon Karten

        Initial werden 20–40 Pokémon angezeigt.

        Über einen Button lassen sich weitere Karten nachladen.

        Jede Karte enthält:

            Name (GROSSGESCHRIEBEN)

            Typ/en

            Pokémon-Bild

            Hintergrundfarbe passend zum Typ

            ID (optional)

            Hover-Effekt für Karten.

    Lazy Loading & Fetch-then-Render

        Daten werden erst geladen, wenn sie benötigt werden.

        Ladebildschirm beim Nachladen weiterer Karten.

        Button ist während des Ladens deaktiviert.

    Detailansicht (Overlay)

        Klick auf eine kleine Karte öffnet eine große Ansicht.

        Transparentes Overlay, klickt man daneben, schließt es sich.

        Seite ist im Overlay nicht scrollbar.

        Anzeige zusätzlicher Werte wie HP, Attack, Defense etc.

        Navigation zwischen Karten mit Pfeilen (wie Galerie).

    Header

        Logo

        Titel

        Suchleiste (mind. 3 Buchstaben nötig, bevor Suche möglich ist).

    Responsive Design

        Vollständig responsive bis 320px ohne horizontales Scrollen.

        Max-Width für große Monitore (z. B. 1440px oder 1920px).

    Sonstiges

        Favicon integriert

        Titel im Dokument vorhanden

        Hauptseite heißt index.html

        Sprachkonsistenz: Buttons, Labels und Inhalte in Englisch

🛠️ Code Guidelines

    Aussagekräftige Namen für Variablen und Funktionen (camelCase).

    Maximal 14 Zeilen pro Funktion.

    Einheitliche Abstände (1–2 Leerzeilen).

    HTML-Templates in eigene Funktionen auslagern.

    Sauber formatierter und strukturierter Code.

    📂 Projektstruktur (Beispiel)
├── index.html
├── styles/
│   ├── style.css
├── scripts/
│   ├── app.js
│   ├── api.js
│   ├── components/
│       ├── card.js
│       ├── overlay.js
├── assets/
│   ├── logo.png
│   ├── favicon.ico
└── README.md