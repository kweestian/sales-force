({
    doInit : function(component, event, helper) {

        console.log("RUNNING***");
        
        var action = component.get("c.getDreamInfo"); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {                
                var theResult = response.getReturnValue();
                component.set("v.dreams", theResult);
                console.log("RAN*** " + theResult.length);
            } 
        
            var colors = [
                'rgba(23, 48, 91, 1)',
                'rgba(62, 159, 222, 1)',
                'rgba(48, 165, 154, 1)',
                'rgba(132, 220, 214, 1)',
                'rgba(222, 159, 0, 1)',
                'rgba(223, 205, 114, 1)'
            ];
            
            var years = window.olympicDataService.getData();

            var months = component.get("v.months");        
            var labels = months;

            var var1 = component.get("v.Var1");        
            var var2 = component.get("v.Var2");        
            var var3 = component.get("v.Var3");        
            var var4 = component.get("v.Var4");        
            var var5 = component.get("v.Var5");        

            var dreamTotals = component.get("v.dreams");
        
            var len = dreamTotals.length;
            var queryResult = [];
            queryResult.push(
                {query: var1},
                {query: var2},
                {query: var3},
                {query: var4},
                {query: var5}
            )
            // console.log("Vars***************************" + dreamTotals[0].Created_Date__c);
            // start loop for queries
            for (var j=0; j<queryResult.length; j++) {
                // for loop for dreams
                // create empty array with as many 0's as labels
                queryResult[j].countArray = new Array(labels.length).fill(0);
                for (var i=0; i<len; i++) {
                    var dream = dreamTotals[i];
                    var monthIndex = parseInt(dream.Created_Date__c.split('-')[1]) - 1;
                    
                    if(dream.Haven__c.includes(queryResult[j].query)){
                        // update count by one if query word is in dream sequence
                      queryResult[j].countArray[monthIndex]++
                    }
                } 
            }
            debugger;
            var datasets = [];
            var countries = {};
            for (var k=0; k<5; +k) {
                datasets.push({
                    label: queryResult[k].query, 
                    data: queryResult[k].countArray,
                    fill: false,
                    borderWidth: 1.5,
                    backgroundColor: colors[k],
                    borderColor: colors[k++],
                    pointBackgroundColor: "#FFFFFF",
                    pointBorderWidth: 4,
                    pointHoverRadius: 8,
                    pointRadius: 6,
                    pointHitRadius: 10,
                });
            }
            
            var ctx = component.find("chart").getElement();
            var chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio :false,
                    onClick: function(event) {
                        var elements = chart.getElementAtEvent(event);
                        console.log("elements");
                        console.log(elements);
                        if (elements.length === 1) {
                            var year = labels[elements[0]._index];
                            var country = datasets[elements[0]._datasetIndex].label;
                            var chartEvent = $A.get("e.c:ChartEvent");
                            chartEvent.setParams({
                                data: {year: year, country: country}
                            });
                            console.log("elm about to fire");
                            chartEvent.fire();
                        }
                    }
                }
            });

        });           
        $A.enqueueAction(action); 
        
    },
    
    trendChange : function(component, event, helper) {
        var action = component.get("c.getTrend"); 
        action.setCallback(this, function(response) {
            var theResult = response.getReturnValue();
            var i = 0;
            var len = theResult.length;
            var newText;
            for (; i < len; i++) {
                newText = theResult[i].Scene_One__c;
                newText = newText.substring(0,40) + '...';
                theResult[i].snippet = newText;
            }
            component.set("v.trending", theResult);
        });           
        $A.enqueueAction(action); 
    },    

    publicChange : function(component, event, helper) {
        console.log("*****Public Change 1");
        var action = component.get("c.getPublic"); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log("The Public State is " + state);
            if (state === "SUCCESS") {                
                var theResult = response.getReturnValue();
                var i = 0;
                var len = theResult.length;
                var newText;
                for (; i < len; i++) {
                    newText = theResult[i].Scene_One__c;
                    newText = newText.substring(0,40) + '...';
                    theResult[i].snippet = newText;
                }
                component.set("v.allDreams", theResult);
            }
        });           
        $A.enqueueAction(action); 
        
    }    
})


