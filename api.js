const api = fetch(
  'https://onedrive.live.com/?cid=D9430307AEA331A6&id=D9430307AEA331A6%21108215&parId=D9430307AEA331A6%21106059&o=OneUp'
).then(response => console.log(response.json))
