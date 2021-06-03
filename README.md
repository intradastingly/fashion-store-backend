# Fashion Store

This project is made for an assignment where we got to learn more about web shops and what kind of magic that happens behind the scenes. We built the backend on top of an existing frontend codebase.


## Front End
The front end is written in react (TypeScript) with Ant Design as design system. The original frontend was built by [Malin Österberg](https://github.com/msmalinosterberg), [Moa Stenqvist](https://github.com/stonetwix) & [Amanda Samuelsson](https://github.com/amandasamuelsson).

## Back End
Our backend is built with Typescript in Express.

For developers:
Clone the project.
Install all dependencies from root directory with npm i.
Run the application from root with npm start.

This project was made by [Asaf Läckgren](https://github.com/intradastingly), [Gustav Andersson](https://github.com/lilgujj), [Anton Mäenpää](https://github.com/antonmaenpaa), [Sebastian Zazzi](https://github.com/zazzzi) & [Alexander Liljedahl](https://github.com/supertramps)


## Kravlista:

 

- Alla sidor skall vara responsiva. ✔
    - Alla sidor fungerar på mobil.
    
- Arbetet ska implementeras med en React frontend och en Express backend. ✔
   
- Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet. ✔

- Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid
idégodkännandet. ✔

- All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter,
beställningar, konton mm). ✔
  - Produktinformation, bilder, ordrar, fraktalternativ & användare sparas på vår Mongo-databas.

- Man ska kunna logga in som administratör i systemet. ✔
  - Det finns två roller i vårt system, "plebian" & "admin". Admins har fullständiga rättigheter i systemet.

- Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i
databasen. ❌
  - Vi gjorde ett val att inte inkludera detta krav då vi anser att endast administratörer ska kunna skapa nya administratörer. Att ge "vanliga" användare möjligheten att skicka en förfrågan om att bli admin kommer enbart skapa problem. 

- En administratör behöver godkännas av en tidigare administratör innan man kan logga
in fösta gången. ❌
  - Vi anser att ett adminkonto som är skapat av en admin redan bör ses som godkänt. Därför valde vi att inte implementera denna lösningen i vårt projekt.

- Inga lösenord får sparas i klartext i databasen. ✔
  - Vi använder oss av bcrypt för att spara krypterade lösenord.

- En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i
databasen. ✔
  - Lagersaldot uppdateras vid lagd order. En kund kan inte beställa varor som är slut på lager.

- Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan. ✔

- Administratörer ska kunna se en lista på alla gjorda beställningar. ✔

- Administratörer ska kunna markera beställningar som skickade. ✔
  - Vi implementerade en "switch" på adminpanelen där en admin enkelt kan markera en order som skickad.

- Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori,
men kan tillhöra flera. ✔

- Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista
bara dom produkter som tillhör en kategori. ✔
 - På framsidan finns det en rad med kategorier där användare kan filtrera produkter. Kategorin "All" är markerad när användaren först besöker sidan.

- Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på
klienten. ✔

- En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in
och måste vara inloggad som kund innan beställningen skapas. ✔
  - Om kunden inte är inloggad och försöker gå till checkout blir hen ombedd att först logga in eller skapa ett konto.

- När man är inloggad som kund ska man kunna se sina gjorda beställning och om den är
skickad eller inte. ✔
  - På kundens profilsida hittar man en fullständig överblick över alla skapade ordrar. Där kan kunden även se om den är skickad eller inte.

- Besökare ska kunna välja ett av flera fraktalternativ. ✔

- Tillgängliga fraktalternativ ska vara hämtade från databasen. ✔

- Administratörer ska kunna redigera vilka kategorier en produkt tillhör. ✔
  - Admins kan redigera kategorier från adminpanelen.

- Administratörer ska kunna lägga till och ta bort produkter. ✔
  - Admins kan skapa och radera produkter från adminpanelen.

- Backendapplikationen måste ha en fungerande global felhantering. ✔

- Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält. ✔
  - Checkoutflödet använder sig av regEx och required så kunden kan inte gå vidare i beställningen om något går fel.
