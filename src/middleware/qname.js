export default (req, res, next) => {
    let qname = req.query.name;
    let _re = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    req.qname = _re.test(qname) ? qname : "";
    
    console.log(req.query.name, '=>', req.qname);
    next();
}