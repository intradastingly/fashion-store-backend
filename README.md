This project is made for an assignment where we got to learn more about web shops and what kind of magic that happens behind the scenes. We built the backend on top of an existing frontend codebase.

You can type /help in the chat to learn about the available commands.

Front En
The front end is written in react (TypeScript) with Ant Design as design system. The original frontend was built by [Malin Österberg](https://github.com/msmalinosterberg), [Moa Stenqvist](https://github.com/stonetwix) & [Amanda Samuelsson](https://github.com/amandasamuelsson).

Back End
Our backend is built with Typescript in Express.

For developers:
Clone the project.
Install all dependencies from root directory with npm i.
Run the application from root with npm start.

This project was made by [Asaf Läckgren](https://github.com/intradastingly), [Gustav Andersson](https://github.com/lilgujj), [Anton Mäenpää](https://github.com/antonmaenpaa), [Sebastian Zazzi](https://github.com/zazzzi) & [Alexander Liljedahl](https://github.com/supertramps)


# Kravlista:

 

- Alla sidor skall vara responsiva. ✔
    - Alla sidor fungerar på mobil.
    
- Arbetet ska implementeras med en React frontend och en Express backend. ✔
   
- Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet. ✔

- Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid
idégodkännandet. ✔

- All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter,
beställningar, konton mm). ✔


- Man ska kunna logga in som administratör i systemet. ✔

- Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i
databasen. ❌
    - Vi gjorde ett val att inte inkludera detta krav då vi anser att endast administratörer ska kunna skapa nya administratörer. Att ge "vanliga" användare möjligheten att skicka en förfrågan om att bli admin kommer enbart skapa problem. 

- En administratör behöver godkännas av en tidigare administratör innan man kan logga
in fösta gången. ❌
  - Vi anser att ett adminkonto som är skapat av en admin redan bör ses som godkänt. Därför valde vi att inte implementera denna lösningen i vårt projekt.

- Inga Lösenord får sparas i klartext i databasen. ✔

- En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i
databasen. ✔

- Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan. ✔

- Administratörer ska kunna se en lista på alla gjorda beställningar. ✔

- Administratörer ska kunna markera beställningar som skickade. ✔

- Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori,
men kan tillhöra flera. ✔

- Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista
bara dom produkter som tillhör en kategori. ✔

- Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på
klienten. ✔

- En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in
och måste vara inloggad som kund innan beställningen skapas. ✔

- När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är
skickade eller inte. ✔

- Besökare ska kunna välja ett av flera fraktalternativ. ✔

- Tillgängliga fraktalternativ ska vara hämtade från databasen. ✔

- Administratörer ska kunna redigera vilka kategorier en produkt tillhör. ✔

- Administratörer ska kunna lägga till och ta bort produkter. ✔

- Backendapplikationen måste ha en fungerande global felhantering. ✔

- Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält. ✔




















