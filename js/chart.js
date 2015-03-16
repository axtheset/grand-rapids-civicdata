      $(document).ready(function() {

        var opts = {
          lines: 13, // The number of lines to draw
          length: 20, // The length of each line
          width: 10, // The line thickness
          radius: 30, // The radius of the inner circle
          corners: 1, // Corner roundness (0..1)
          rotate: 0, // The rotation offset
          direction: 1, // 1: clockwise, -1: counterclockwise
          color: '#000', // #rgb or #rrggbb or array of colors
          speed: 1, // Rounds per second
          trail: 60, // Afterglow percentage
          shadow: false, // Whether to render a shadow
          hwaccel: true, // Whether to use hardware acceleration
          className: 'spinner', // The CSS class to assign to the spinner
          zIndex: 2e9, // The z-index (defaults to 2000000000)
          top: '50%', // Top position relative to parent
          left: '50%' // Left position relative to parent
        };
        
        var spinner = new Spinner(opts).spin();
        $('#loading').append(spinner.el);

        $('.canvas').hide();

        var resourceId = "e741edf8-04ad-450d-bc62-6684a7a427dd";
        //var baseURI = "http://www.civicdata.com/api/action/datastore_search_sql?sql=";
        var baseURI = "http://civicdataprod1.cloudapp.net/api/action/datastore_search_sql?sql=";
        
        // Helper function to make request for JSONP.
        function requestJSON(url, callback) {
          $.ajax({
            beforeSend: function(){
            // Handle the beforeSend event
            },
            url: url,
            complete: function(xhr) {
              callback.call(null, xhr.responseJSON);
             $('.canvas').show();
             $('#loading').hide();
               
            }
          });
        }

        

        var constructionCostQuery = "SELECT \"Neighborhood\" as Neighborhood, substring(\"Issued\" from 6 for 2) as Month, SUM(cast(\"Construction Cost\" as double precision)) as TotalConstructionCost from \"resource_id\" where \"Issued\" >= '2014-01-01' and \"Issued\" <= '2014-12-31' and \"Neighborhood\" != '' group by Neighborhood, Month order by Neighborhood, Month, TotalConstructionCost desc";

        var constructionCost = baseURI + encodeURIComponent(constructionCostQuery.replace("resource_id",resourceId));
        // Make API call and format results.
        requestJSON(constructionCost, function(json) {
          var records = json.result.records
          
          var neighborhoods = [];

          //Get a distinct list of neighborhoods
          for(var i=0; i<records.length; i++) {
            if ($.inArray(records[i].neighborhood, neighborhoods) == -1 )
              neighborhoods.push(records[i].neighborhood);
          }


          var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
          var dataColumns = new Array();

          var zz = 0
          for (var n in neighborhoods) {
            var neighborhood = neighborhoods[n];
            dataColumns[neighborhood] = [];
            //for each neighborhood add an entry in the dataColumns array with neighborhood has index 0 and value for each month
            for(var i=0; i<records.length; i++) {
              if (records[i].neighborhood == neighborhood) {
                dataColumns[neighborhood][records[i].month] = records[i].totalconstructioncost;
              }
            }
            zz++;
          }

          var chartData = [];

          for (var aa in dataColumns) {
            var curNeigh = dataColumns[aa];
            var tempArray = [];
            tempArray.push(aa);
            for (var m in months) {
              if (curNeigh[months[m]] != undefined)
                tempArray.push(curNeigh[months[m]]);
              else
                tempArray.push(0);
            }
            chartData.push(tempArray);
          }

            var chart = c3.generate({
              bindto: '#chart',
              data: {
                  columns: chartData,
                  type: 'bar',
                  groups: [ neighborhoods ]
              },
              grid: {
                  y: {
                      lines: [{value:0}]
                  }
              },
              axis: {
                  x: {
                      type: 'category',
                      categories: months
                  }
              }
          });
    
        });

        var urlYearCompareQuery = "SELECT substring(\"Issued\" from 1 for 4) as Year, substring(\"Issued\" from 6 for 2) as Month, count(*) as Count from \"resource_id\" group by Year, Month order by Year, Month";

        var urlYearCompare = baseURI + encodeURIComponent(urlYearCompareQuery.replace("resource_id",resourceId));

        requestJSON(urlYearCompare, function(json) {
          var records = json.result.records
          var count00 = ['2000'];
          var count01 = ['2001'];
          var count02 = ['2002'];
          var count03 = ['2003'];
          var count04 = ['2004'];
          var count05 = ['2005'];
          var count06 = ['2006'];
          var count07 = ['2007'];
          var count08 = ['2008'];
          var count09 = ['2009'];
          var count10 = ['2010'];
          var count11 = ['2011'];
          var count12 = ['2012'];
          var count13 = ['2013'];
          var count14 = ['2014'];
          for(var i=0; i<records.length; i++) {
            if (records[i].year == "2000")
              count00.push(parseInt(records[i].count));
            if (records[i].year == "2001")
              count01.push(parseInt(records[i].count));
            if (records[i].year == "2002")
              count02.push(parseInt(records[i].count));
            if (records[i].year == "2003")
              count03.push(parseInt(records[i].count));
            if (records[i].year == "2004")
              count04.push(parseInt(records[i].count));
            if (records[i].year == "2005")
              count05.push(parseInt(records[i].count));
            if (records[i].year == "2006")
              count06.push(parseInt(records[i].count));
            if (records[i].year == "2007")
              count07.push(parseInt(records[i].count));
            if (records[i].year == "2008")
              count08.push(parseInt(records[i].count));
            if (records[i].year == "2009")
              count09.push(parseInt(records[i].count));
            if (records[i].year == "2010")
              count10.push(parseInt(records[i].count));
            if (records[i].year == "2011")
              count11.push(parseInt(records[i].count));
            if (records[i].year == "2012")
              count12.push(parseInt(records[i].count));
            if (records[i].year == "2013")
              count13.push(parseInt(records[i].count));
            if (records[i].year == "2014")
              count14.push(parseInt(records[i].count));
          }

            var chart = c3.generate({
              bindto: '#chartYear',
              data: {
                  columns: [
                      //['x', '01', '02','03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                      count00,
                      count01,
                      count02,
                      count03,
                      count04,
                      count05,
                      count06,
                      count07,
                      count08,
                      count09,
                      count10,
                      count11,
                      count12,
                      count13,
                      count14
                  ]
              },
              axis: {
                  x: {
                      type: 'categorized',
                      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                  }
              }
            });
          
        });        

        var urlPieQuery = "SELECT \"Type\" as RecordType, count(*) as Count from \"resource_id\" group by RecordType order by Count desc";

        var urlPie = baseURI + encodeURIComponent(urlPieQuery.replace("resource_id",resourceId));

            // Draw the bar chart.
        requestJSON(urlPie, function(json) {
          var records = json.result.records
          var pieCounts = [];
          for(var i=0; i<records.length; i++) {
            pieCounts.push([records[i].recordtype,parseInt(records[i].count)]);
          }
          var pieChart = c3.generate({
              bindto: '#pieChart',
              data: {
                  // iris data from R
                  columns: pieCounts,
                  type : 'pie',
              },
              pie: {
                  onclick: function (d, i) { console.log(d, i); },
                  onmouseover: function (d, i) { console.log(d, i); },
                  onmouseout: function (d, i) { console.log(d, i); }
              }
          });

          });

        var pOnlineQuery = "SELECT \"Applied Online\", count(*) as COUNT FROM \"resource_id\" WHERE \"Applied Online\" != \'\' and substring(\"Issued\" from 1 for 4) >= \'2011\' GROUP BY \"Applied Online\" ORDER BY COUNT DESC";

        var pOnline = baseURI + encodeURIComponent(pOnlineQuery.replace("resource_id",resourceId));
            // Draw the bar chart.
        requestJSON(pOnline, function(json) {
          var records = json.result.records
          var createdOnline;
          var createdOffline;
          for(var i=0; i<records.length; i++) {
            if (records[i]["Applied Online"] == "Y")
              createdOnline = records[i].count;
            else
              createdOffline = records[i].count;
          }

          var percentOnline = (createdOnline / (parseInt(createdOnline) + parseInt(createdOffline))) * 100;
          //console.log(createdOnline);
          //console.log(createdOffline);
          //console.log(parseInt(createdOnline) + parseInt(createdOffline));
          var onlinePercentage = c3.generate({
              bindto: '#onlinePercentageAll',
              data: {
                  // iris data from R
                  columns: [
                    ['data', percentOnline]
                  ],
                  type : 'gauge',
              },
              gauge: {
                  //min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
                  //max: 100, // 100 is default
                  //width: 55 // for adjusting arc thickness
                  },
                  color: {
                      pattern: ['#FF0000', '#F97600', '#60B044'], // the three color levels for the percentage values.
                      threshold: {
              //            unit: 'value', // percentage is default
              //            max: 200, // 100 is default
                          values: [30, 60, 70]
                      }
                  },

              });
              
          });


        
        var onlineByYearQuery = "SELECT substring(\"Issued\" from 1 for 4) as Year, \"Applied Online\", count(*) as Count from \"resource_id\" WHERE \"Applied Online\" != \'\' and \"Issued\" >= \'2011-06-01\' group by Year, \"Applied Online\" order by Year, \"Applied Online\"";

        var onlineByYear = baseURI + encodeURIComponent(onlineByYearQuery.replace("resource_id",resourceId));

        //var onlineByYear = 'http://www.civicdata.com/api/action/datastore_search_sql?sql=SELECT%20substring(%22DATE%20OPENED%22%20from%201%20for%204)%20as%20Year,%20%22CREATED%20ONLINE%22,%20count(*)%20as%20Count%20from%20%22e741edf8-04ad-450d-bc62-6684a7a427dd%22%20WHERE%20substring(%22DATE%20OPENED%22%20from%201%20for%204)%20%3E=%20%272011%27%20group%20by%20Year,%20%22CREATED%20ONLINE%22%20order%20by%20Year,%20%22CREATED%20ONLINE%22';

            // Draw the bar chart.
        requestJSON(onlineByYear, function(json) {
          var records = json.result.records
          var online = ['Online'];
          var paper = ['Paper'];

          for(var i=0; i<records.length; i++) {
            if (records[i]["Applied Online"] == "Y")
              online.push(parseInt(records[i].count))
            else
              paper.push(parseInt(records[i].count))
          }

          var onlineByYear = c3.generate({
             bindto: '#onlineByYearAll',
             data: {
                  columns: [
                      online,//['Online', 300, 350, 300, 0, 0, 0 ],
                      paper//['Paper', 130, 100, 140, 200, 150, 50]
                  ],
                  types: {
                      Online: 'area-spline',
                      Paper: 'area-spline'
                  },
                  
              },
              axis: {
                    x: {
                        type: 'category',
                        categories: ['2011', '2012', '2013', '2014', '2015', '2016']
                    }
                }
          });
              
          });

        var dateCalc = moment().subtract(12, 'months').format("YYYY-MM-DD");

        var permitDescQuery = "SELECT \"Description\" from \"resource_id\" WHERE \"Applied Online\" != \'\' and \"Issued\" >= \'" + dateCalc + "\'";

        var permitDesc = baseURI + encodeURIComponent(permitDescQuery.replace("resource_id",resourceId));


        requestJSON(permitDesc, function(json) {
            var descriptions = json.result.records;

            var descString = "";

            descriptions.forEach(function(d) {
              descString += d.Description + " ";
            });

            var descArray = descString.split(" ");

            var descObjects = [];
            descArray.forEach(function(d) {
              if (!isNumeric(d) && !matches(d,"AND","OF","TO","","&","ON","-","THE","IN","BE","FOR","A")) {
                var descObject = {}
                descObject.description = d;
                descObjects.push(descObject);
              }
            });
                      
            var wordCount = d3.nest()
              .key(function(d) { return d.description; })
              .rollup(function(v) { return v.length; })
              .entries(descObjects);

            wordCount.sort(function(a,b) {
              return b.values - a.values;
            });    

            var tags = [];

            wordCount.forEach(function(d) {
              tags.push([d.key,parseInt(d.values)]);
            });



            tags = tags.slice(0,250);

            
            WordCloud(document.getElementById('cloud'), {
              list : tags.map(function(word) { return [word[0], Math.round(word[1]/5)]; })
            });

            //console.log(tagMap);
            
            var clicked = function(ev) {
              if (ev.target.nodeName === "SPAN") {
                var tag = ev.target.textContent;
                var tagElem;
                if (tags.some(function(el) { if (el[0] === tag) {tagElem = el; return true;} return false; })) {
                document.getElementById("details").innerText = "There were " + tagElem[1] + 
                    " mentions in permit descriptions of “" + tag + "” in the last year";
                }
              } else {
                document.getElementById("details").innerText = "";
              }
            }
            document.getElementById("cloud").addEventListener("click", clicked)
              
          });



      });

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function matches(eVal,argList) {
   for (var i=1; i<arguments.length;i++)
    if (arguments[i] == eVal)
      return true;
}