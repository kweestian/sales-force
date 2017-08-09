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
        
        console.log(dreamTotals, 'dreamTotal');
        
        // var listA = [], listA1 = [],listA2 = [],listA3 = [],listA4 = [],listA5 = [],listA6 = [],listA7 = [],listA8 = [],listA9 = [],listA10 = [],listA11 = [],listA12 = [];
        // var listB = [], listB1 = [],listB2 = [],listB3 = [],listB4 = [],listB5 = [],listB6 = [],listB7 = [],listB8 = [],listB9 = [],listB10 = [],listB11 = [],listB12 = [];
        // var listC = [], listC1 = [],listC2 = [],listC3 = [],listC4 = [],listC5 = [],listC6 = [],listC7 = [],listC8 = [],listC9 = [],listC10 = [],listC11 = [],listC12 = [];
        // var listD = [], listD1 = [],listD2 = [],listD3 = [],listD4 = [],listD5 = [],listD6 = [],listD7 = [],listD8 = [],listD9 = [],listD10 = [],listD11 = [],listD12 = [];
        // var listE = [], listE1 = [],listE2 = [],listE3 = [],listE4 = [],listE5 = [],listE6 = [],listE7 = [],listE8 = [],listE9 = [],listE10 = [],listE11 = [],listE12 = [];
    
        var len = dreamTotals.length;
        var resultDreams = {};
        console.log("Vars***************************" + dreamTotals[0].Created_Date__c);
        for (var i=0; i<len; ++i) {
            var dream = dreamTotals[i];
            var monthIndex = parseInt(dream.Created_Date__c.split('-')[1]) - 1;

            dream.countArray = new Array(len).fill(0);
            debugger;

            if(dream.Haven__c.includes(var1)){
              dream.countArray[monthIndex]++
            }
            if(dream.Haven__c.includes(var2)){
                dream.countArray[monthIndex]++
            }
            if(dream.Haven__c.includes(var3)){
                dream.countArray[monthIndex]++
            }
            if(dream.Haven__c.includes(var4)){
                dream.countArray[monthIndex]++
            }
            if(dream.Haven__c.includes(var5)){
              dream.countArray[monthIndex]++
            }
        }

        // listA.push(listA1.length,listA2.length,listA3.length,listA4.length,listA5.length,listA6.length,listA7.length,listA8.length,listA9.length,listA10.length,listA11.length,listA12.length);
        // listB.push(listB1.length,listB2.length,listB3.length,listB4.length,listB5.length,listB6.length,listB7.length,listB8.length,listB9.length,listB10.length,listB11.length,listB12.length);
        // listC.push(listC1.length,listC2.length,listC3.length,listC4.length,listC5.length,listC6.length,listC7.length,listC8.length,listC9.length,listC10.length,listC11.length,listC12.length);
        // listD.push(listD1.length,listD2.length,listD3.length,listD4.length,listD5.length,listD6.length,listD7.length,listD8.length,listD9.length,listD10.length,listD11.length,listD12.length);
        // listE.push(listE1.length,listE2.length,listE3.length,listE4.length,listE5.length,listE6.length,listE7.length,listE8.length,listE9.length,listE10.length,listE11.length,listE12.length);
        
        // console.log("***************************" + listA.length);
        // console.log("***************************" + listB.length);
        // console.log("***************************" + listC.length);
        // console.log("***************************" + listD.length);
        // console.log("***************************" + listE.length);

        var datasets = [];
        var countries = {};
        var theDreams = new Array();
        var dreamTags = [];

        // not sure what dreamNumbers is doing
        // var dreamNumbers = [];
  //       dreamNumbers.push(resultDreams.countArray1.length);        
  //       dreamNumbers.push(resultDreams.countArray2.length);        
  //       dreamNumbers.push(resultDreams.countArray3.length);        
  //       dreamNumbers.push(resultDreams.countArray4.length);        
  //       dreamNumbers.push(resultDreams.countArray5.length);        
            
        



        // theDreams.push(resultDreams.countArray1);
        // theDreams.push(resultDreams.countArray5);
        // theDreams.push(resultDreams.countArray5);
        // theDreams.push(resultDreams.countArray5);
        // theDreams.push(resultDreams.countArray5);
        console.log("MAP NUMBER ***** " + theDreams[4]);
            
        
        var j;
        for (j=0; j<5; +j) {
            datasets.push({
                label: dreamTags[j], 
                data: dreamTotals[j].countArray,
                fill: false,
                borderWidth: 1.5,
                backgroundColor: colors[j],
                borderColor: colors[j++],
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