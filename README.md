# git-stats

Microservice API for gathering GitHub informations on a given User. 
Developed for a Data Visualization section on my [presonal page](https://salvatoreventr.one).
Live on [Glitch](https://observant-mouth.glitch.me).

## Endpoints

### GET User Repos

Lists the public repositories of a given User, including their language lists.

```
{{HOST}}/repos?name=Ventrosky
```

#### Example Response

```
[
    {
        "id": 168613721,
        "full_name": "Ventrosky/Bears-Team-21",
        "description": "Multiplayer Board Game - Saboteur  | Voyage-7 | https://chingu.io/",
        "name": "Bears-Team-21",
        "languages_url": "https://api.github.com/repos/Ventrosky/Bears-Team-21/languages",
        "html_url": "https://github.com/Ventrosky/Bears-Team-21",
        "fork": true,
        "languages": {
            "Python": 60776,
            "JavaScript": 36120,
            "HTML": 21439,
            "CSS": 16219,
            "PowerShell": 363,
            "Dockerfile": 116,
            "Shell": 42
        }
    }
]
```

### GET User Events

Fetch the User's 100 latest updates on GitHub.

```
{{HOST}}/events?name=Ventrosky
```

#### Example Response

```
{
    "name": "Latest projects activity",
    "children": [
        {
            "name": "reagent-project/reagent-cookbook",
            "evts": {
                "WatchEvent": 1
            },
            "url": "https://api.github.com/repos/reagent-project/reagent-cookbook",
            "totals": 1
        },
         {
            "name": "chingu-voyage7/Bears-Team-21",
            "evts": {
                "PushEvent": 1,
                "PullRequestEvent": 2
            },
            "url": "https://api.github.com/repos/chingu-voyage7/Bears-Team-21",
            "totals": 3
        }
    ]
}
```


### GET Treemap Activity

User's 100 latest updates on GitHub sent back as a string JSON for data visualization.

```
'=> single level treemap 
{{HOST}}/streemap?name=Ventrosky

'=> multilevel treemap
{{HOST}}/treemap?name=Ventrosky
```

#### Example Response

```
"{\"name\":\"Latest projects activity\",\"children\":[{\"name\":\"Ventrosky/free-code-camp\",\"evts\":{\"PushEvent\":5},\"url\":\"https://github.com/Ventrosky/free-code-camp\",\"colname\":\"level2\",\"value\":5},{\"name\":\"Ventrosky/git-stats\",\"evts\":{\"PushEvent\":9,\"CreateEvent\":2},\"url\":\"https://github.com/Ventrosky/git-stats\",\"colname\":\"level2\",\"value\":11}],\"colname\":\"level1\"}"
```