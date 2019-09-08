

import octokit from './octo';

const USERNAME = "Ventrosky";

exports.octoUserRepos = (name)=>{
    const getRepoLangs = async (obj, repo, name)=>{
        return await octokit.repos.listLanguages({
            "owner": name || USERNAME,
            repo
        }).then(resp => {
          return Object.assign(obj, {"languages": resp.data});
       })
       .catch(error => {
         console.log(error);
       });
    }
    let user = name || USERNAME;
    return octokit.repos.listForUser({
        "per_page": 100,
        "username": user
    })
    .then(async resp=>{
        return Promise.all(resp.data.map(async r=>{
            return Promise.resolve(await getRepoLangs({
                "id": r.id,
                "full_name": r.full_name,
                "description":r.description,
                "name": r.name,
                "languages_url": r.languages_url,
                "html_url":r.html_url,
                "fork": r.fork
                }, r.name, user))
            }))
        })
    .catch(ex=> console.log(ex));
}

const objProxy = (init)=> {
    return new Proxy({}, {
        get (target, key) {
          if(key == "toJSON") 
            return JSON.stringify(target);
          return target.hasOwnProperty(key) && target[key] || (target[key] = init());
        }
      });
}

exports.octoUserEvents = (name)=>{
  return octokit.activity.listEventsForUser({
    "per_page": 100,
    "username": name || USERNAME
  }).then(evts=>{
      let results = evts.data.reduce((prx,evt) => {
      prx[evt.repo.id].name = evt.repo.name;
      prx[evt.repo.id].url = evt.repo.url;
      prx[evt.repo.id].evts[evt.type] = prx[evt.repo.id].evts[evt.type] + 1;
      return prx;
    }, objProxy(()=> {return {"name":"", "evts": objProxy(n=>0), "url":""}}));
    let children = Object.values(results).map(e=>{
      return Object.assign(e, {"totals": Object.values(e.evts).reduce((a,b)=>{return a+b})})
    });
    return {
      "name" : `Latest projects activity`,
      children,
      "colname":"level1"
    };
  })
  .catch(ex=> console.log(ex));;
}

exports.octoUserTreemap = (name)=>{
  return octokit.activity.listEventsForUser({
    "per_page": 100,
    "username": name || USERNAME
  }).then(evts=>{
      let results = evts.data.reduce((prx,evt) => {
      prx[evt.repo.id].name = evt.repo.name;
      prx[evt.repo.id].url = evt.repo.url;
      prx[evt.repo.id].children[evt.type] = prx[evt.repo.id].children[evt.type] + 1;
      prx[evt.repo.id]["colname"]="level2";
      return prx;
    }, objProxy(()=> {return {"name":"", "children": objProxy(n=>0), "url":""}}));
    let middle = Object.values(results).map(e=>{
      return Object.assign(e, {"totals": Object.values(e.children).reduce((a,b)=>{return a+b})})
    });
    
    let children = middle.map(el => {
      let lst = [];
      let keys = Object.keys(el.children);
      for(let i=0; i < keys.length; i++){
        lst.push({
          "name":keys[i],
          "repo":el.name,
          "group":String.fromCharCode("A".charCodeAt(0)+i),
          "value":el.children[keys[i]],
          "colname":"level3"});
      }
      el.children = lst;
      return el;
    });
    return {
      "name" : `Latest projects activity`,
      children,
      "colname":"level1"
    };
  })
  .catch(ex=> console.log(ex));
}

exports.octoUsrSmplTreemap = (name)=>{
    return octokit.activity.listEventsForUser({
        "per_page": 100,
        "username": name || USERNAME
      }).then(evts=>{
            let results = evts.data.reduce((prx,evt) => {
                if (evt.type == "PullRequestReviewCommentEvent"){
                  evt.type = "ReviewCommentEvent";
                }
                prx[evt.repo.id].name = evt.repo.name;
                prx[evt.repo.id].url = evt.repo.url.replace(/^https\:\/\/api\.github\.com\/repos\/(.+)$/, "https://github.com/$1");
                prx[evt.repo.id].evts[evt.type] = prx[evt.repo.id].evts[evt.type] + 1;
                prx[evt.repo.id]["colname"]="level2";
                return prx;
            }, objProxy(()=> {return {"name":"", "evts": objProxy(n=>0), "url":""}}));
        let middle = Object.values(results).map(e=>{
          return Object.assign(e, {"value": Object.values(e.evts).reduce((a,b)=>{return a+b})})
        });
        
        return {
          "name" : `Latest projects activity`,
          "children":middle,
          "colname":"level1"
        };
      })
      .catch(ex=> console.log(ex));
  }