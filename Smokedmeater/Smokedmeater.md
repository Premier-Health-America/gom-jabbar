# Smokedmeater: A poutinerie run by robots

## Introduction

This project is designed to resolve a key issue facing Montreal: Poutine demand is so high that the chefs can't keep up! This project serves to resolve this by utilizing robots :robot:
This project enables the production of poutine by API 'robots'. It follows OpenAPI format. The UI acts as a controller for the start of poutine production. The operator can control the oil type.

## Built With

[![My Skills](https://skillicons.dev/icons?i=react,tailwind,next,express)](https://skillicons.dev)

## Quick start

1. Clone the code locally

```
git clone https://github.com/Premier-Health-America/gom-jabbar/
```

2. Switch to the code folder

   ```
   cd Smokedmeater
   ```

3. Start the server

   ```
   npm run dev
   ```

## APIs

- Outremona: take cheese from a box an squeeze it
- Montroyashi: listen to other robots' environment sounds and display Leonard Cohen lyrics, detect drunk people
- Verduny: cut potatoes in dynamically-sized cube and dip them in maple sirup
- Nordo: boil potatoes and give their current softness level
- Bizar: fry potatoes with multiple oil choices
- Oldoporto: keep things at a specific temperature in a pot
- Pierre: mix ingredient in a cardboard, allow the box to be sent to needy user

![API Architecture Diagram](poutine_architecture_diagram.png?raw=true "Poutine API Architecture")

### API Endpoints

| **Method** | **Endpoint**            | **Description**                                                 |
| ---------- | ----------------------- | --------------------------------------------------------------- |
| POST       | `/squeeze`              | Squeezes cheese and adds the amount to `squeezedCheese`.        |
| GET        | `/squeezedCheese`       | Retrieves a message about the cheese squeezed.                  |
| POST       | `/setSqueezedCheese`    | Resets the `squeezedCheese` amount.                             |
| GET        | `/lyrics`               | Retrieves Leonard Cohen lyrics.                                 |
| GET        | `/detect-drunk`         | Randomly detects if a person is drunk and increments the count. |
| GET        | `/get-drunks`           | Retrieves the total number of drunk people detected.            |
| POST       | `/cut`                  | Cuts potatoes based on the given size.                          |
| POST       | `/dip`                  | Dips potatoes in syrup for a specified time.                    |
| POST       | `/boil`                 | Boils potatoes for a specified duration.                        |
| GET        | `/softness`             | Retrieves the softness level of the potatoes.                   |
| POST       | `/fry`                  | Fries potatoes using the specified oil type.                    |
| POST       | `/maintain-temperature` | Maintains the temperature at the specified level.               |
| POST       | `/mix`                  | Mixes ingredients together.                                     |
| POST       | `/send`                 | Sends a box to the specified address.                           |

## Poutine Process

1. take a handful of squeaky cheese
2. squeeze it until it screams "I'm not a Montreal's bagel who are the best in the world, don't even talk to me about
   New York bagels, amateur!"
3. cut the potatoes in exactly 1 inch per 1 inch cube
4. dip the potatoes in maple sirup for 25 seconds
5. put the dipped potatoes directly in boiling water
6. let them cook until they get soft-ish
7. get them out of the boiling water and put them in a oil-filled fryer
8. retrieve the lyrics of a random Leonard Cohen song and sing it to the potatoes
9. stir up the secret gravyy sauce in a separate pot and keep it warm at the exact temperature before boiling
10. expertly mix up all of the fried potatoes, gravy and cheese into a cardboax
11. wait for people to get drunk and the hour to be past 2am

## Design Notes

The final stage in creating the poutine is for people to get drunk and the hour to be past 2am. After the poutine is created, a button to deliver the poutine to the users appears. It returns a random count of drunk people, and it checks the system time. If it is not yet 2am, the operator will not hand out the poutine. For ease of use, that functionality is built in but can be overrided by removing the commented code block in the frontend > app > page.js file.

## Customizing Oil Type

Oil Type is customizable in the UI. The user is prompted to choose oil type upon running the program.
