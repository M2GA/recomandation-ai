console.log("Let's started");
var creation = (pers, livres) => {
  var a = {}
  for ( var p = 1; p <= pers; p++ ) {
    a['P' + p] = {}
    for ( var l = 1; l <= livres; l++ ) {
      if ( Math.random() < 0.5 ) {
        a['P' + p]['L' + l] = 6 * Math.random() | 0
      }
    }
  }
  return a
}

var eucl_sim = (p1, p2, pref) => {
  var commun = Object.keys(pref[p1]).filter( k => pref[p2].hasOwnProperty(k) )
  if ( commun == 0 ) return 0
  var carres = commun.reduce((a, v) => a + ( pref[p1][v] - pref[p2][v] ) ** 2, 0)
  return 1 / ( 1 + Math.sqrt(carres) )
}

var meilleurs_critiques = (pers, pref, fnct_sim = eucl_sim) => {
  Object.keys(pref).map( p => 
    p != pers ? [ p, fnct_sim(pers, p, pref) ] : [ p, -1 ] )
    .sort((a, b) => b[1] - a[1])
    .slice(0, -1)
    .join('\n')
}

var recommande = (pers, pref, fnct_sim = eucl_sim) => {
  var totaux = {}
  var sommeSim = {}
  for ( var p in pref ) {
    if ( p == pers ) continue
    var sim = fnct_sim(pers, p, pref)
    if ( sim == 0 ) continue
    for ( var l in pref[p] ) {
      if ( !pref[pers].hasOwnProperty(l) ) {
        totaux[l] = ( totaux[l] || 0 ) + sim * pref[p][l]
        sommeSim[l] = ( sommeSim[l] || 0 ) + sim
      }
    }
  } 
  return Object.entries(totaux)
  .map(([l, v]) => [l, v / sommeSim[l]])
  .sort((a, b) => b[1] - a[1])
}

const collecte = creation(50,80)
console.log(recommande('P1', collecte))