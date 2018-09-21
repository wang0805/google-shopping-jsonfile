// Write your solutions below
const jsonfile = require('jsonfile');

const file = 'products.json'

//part 1
jsonfile.readFile(file, function(err, obj) {
  //console.dir(obj)
  var items = obj.items;
  var count = 0;
  var result = {};
  var resultFile = 'result.json'

  for(var i=0;i<obj.items.length;i++){
    if(items[i].kind == "shopping#product"){
      //result[i] = obj.items[i];
      count++
      result["items with kind shopping#product"] = "count: "+count;
    }
  }

  for(var i=0;i<obj.items.length;i++){
    var backorder = [];
    if(items[i].product.inventories[0].availability == "backorder"){
      backorder.push(items[i].product.title);
      result["titleBackorderInventories"] = backorder;
    }
  }

  for (var i=0;i<obj.items.length;i++) {
    var imgItem = [];
    var item = items[i].product;
    if (item.images.length > 1) {
      //console.log(item.title);
      imgItem.push(item.title);
      result["itemsMoreThanOneImage"] = item.title;
    }
  }

  for (var index in items) {
    var canon = [];
    var item = items[index].product;
    if (item.brand === "Canon") {
      canon.push(items);
      //console.log(item.title);
      result["canon items"] = canon;
    }
  }

  jsonfile.writeFile(resultFile, result, function (err) {
    console.error(err)
  });

});
