Example query
```graphql
{
    getPokemon(id: 100) {
    name
    height
    weight
    sprite
    species {
      base_happiness
      capture_rate
      habitat
    }
  }
}
```
Output
```json
{
  "data": {
    "getPokemon": {
      "name": "voltorb",
      "height": 5,
      "weight": "104",
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png",
      "species": {
        "base_happiness": "70",
        "capture_rate": 190,
        "habitat": "urban"
      }
    }
  }
}
```