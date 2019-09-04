# git-stats

Microservice API for gathering GitHub informations on a given User. Developed as part of a personal Data Visualization project.

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