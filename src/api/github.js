

import octokit from './octo';

const USERNAME = "Ventrosky";

exports.octoUserRepos = (name)=>{
    const getRepoLangs = async (obj, repo, name)=>{
        return await octokit.repos.listLanguages({
            "owner": name || USERNAME,
            repo
        }).then(resp => {
          console.log(obj);
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
        console.log(resp.data);
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

exports.octoUserEvents = (name)=>{
  return octokit.activity.listEventsForUser({
    "per_page": 100,
    "username": name || USERNAME
  }).then(evts=>{
      console.log(evts.data);
      let results = evts.data.reduce((prx,evt) => {
      prx[evt.repo.id].name = evt.repo.name;
      prx[evt.repo.id].url = evt.repo.url;
      prx[evt.repo.id].evts.push(evt.type);
      return prx;
    }, new Proxy({}, {
      get (target, key) {
        if(key == "toJSON") 
          return JSON.stringify(target);
        return target.hasOwnProperty(key) && target[key] || (target[key] = {"name":"", "evts": [], "url":""});
      }
    }));
    let children = Object.values(results).map(e=>{
      return Object.assign(e, {"totals": e.evts.length})
    });
    return {
      "name" : `Latest projects activity`,
      children
    };
  })
  .catch(ex=> console.log(ex));;

}