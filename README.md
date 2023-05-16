# Attack-Defense-Scoreboard
A simple scoreboard to display the ranking of two services running on two separate chains: ETH &amp; APT

![](assets/ETH_scoreboard.jpeg)

## Docs

> All endpoints expect JSON data.

### Common parameters:
- chain:
  * `ETH`
  * `APT`

- fixStatus:
  * `valid` 
  * `invalid` 
  * `paused` 
  * `{blank}`

- team:
  * `"dice_gang"`
  * `"zero_tolerance"`
  * `"nyahello"`
  * `"idek"`
  * `"social_engineering_experts"`
  * `"hexagon"`
  * `"fibonhack"`
  * `"tower_of_hanoi"`

### Endpoints:

`/addPoints`
> Add (or subtract) points for a given team.
- Params:
    * secret
    * team
    * chain
    * attackPoints
    * defensePoints
    * fixStatus

`/sudoSetPoints`
> Sets points for a given team
- Params:
    * secret
    * team
    * chain
    * attackPoints
    * defensePoints
    * fixStatus

`/export`
> Exports the entire scoreboard as json

`/import`
> Imports the scoreboard from json
- Params:
    * secret
    * scoreboard
