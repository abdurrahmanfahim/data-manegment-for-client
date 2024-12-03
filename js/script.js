const allUsersInPerform = document.querySelector('.all-users-table')
const under30Table = document.querySelector('.underThirtee-table')
const over30Table = document.querySelector('.overThirtee-table')
const userInPerform = document.querySelector('.all-users-table .users-by-perform')
const performLi = document.querySelector('.perform-li')
const performContent = document.querySelector('#dashboard')
const underThirteeLi = document.querySelector('.underThirtee-li')
const overThirteeLi = document.querySelector('.thirtee-li')
const compareLi = document.querySelector('.compare')
const underThirteeDiv = document.querySelector('#under30')
const overThirteeDiv = document.querySelector('#over30')
const compareTable = document.querySelector('#compaire-all-data')
const compareUnder30 = document.querySelector('.under30-show')
const compareOver30 = document.querySelector('.over30-show')
const compareTop = document.querySelector('.top-show')
const compareActive = document.querySelector('.active-show')

console.log();

performLi.addEventListener("click",() => {
    performContent.style.display = "block";
    underThirteeDiv.style.display = "none";
    compareTable.style.display = "none";
    performLi.classList.add("active");
    compareLi.classList.remove("active");
    overThirteeLi.classList.remove("active");
    underThirteeLi.classList.remove("active");
})

compareLi.addEventListener("click",() => {
    performContent.style.display = "none";
    underThirteeDiv.style.display = "none";
    overThirteeDiv.style.display = "none";
    compareTable.style.display = "block";
    compareLi.classList.add("active");
    performLi.classList.remove("active");
    overThirteeLi.classList.remove("active");
    underThirteeLi.classList.remove("active");
})

const users = [
    { id: 1, name: "Alice", age: 25, isActive: true, scores: [85, 92, 88] },
    { id: 2, name: "Bob", age: 30, isActive: false, scores: [70, 75, 80] },
    { id: 3, name: "Charlie", age: 35, isActive: true, scores: [95, 90, 93] },
    { id: 4, name: "Diana", age: 28, isActive: true, scores: [60, 65, 70] },
    { id: 5, name: "Eve", age: 40, isActive: false, scores: [80, 85, 88] },
];    

let ageGroups;

function processUsers() {

    let activeUsers = users.filter((item) =>{

        if (item.isActive == true) {
            return item.isActive
        }
    })
        
    let averageScore = activeUsers.map((item) => {
        let totalScore = item.scores.reduce((a, b) => {
            return a + b;
        })
        item.averageScore = (totalScore / item.scores.length).toFixed(2);
    })
    
    let topPerformer = activeUsers.reduce((a, b) => {
        return a.averageScore > b.averageScore ? a : b;
    })

    ageGroups = {
        under30: activeUsers.filter((item) => {
            return item.age < 30;
        }),
        over30: activeUsers.filter((item) => {
            return item.age >= 30;
        })
    }

    return {
        activeUsers,
        topPerformer, 
        ageGroups    
    };
}

const result = processUsers();
console.log("Final Result:", result);

// fx ===================== dashboardMantain
let userMainStored = users;
function dashboardMantain () {

    userMainStored.map((item) => {
        
        let totalScore = item.scores.reduce(function (x, y) {
            return x + y;
        });
        item.averageScore = (totalScore / item.scores.length).toFixed(2);
    })
    
    sorting = userMainStored.sort((a, b) => b.averageScore - a.averageScore)
    
    userMainStored.map((item, index) => {
        
        if (item.isActive == true) {
            item.isActive = "Active"
        }
        else{
            item.isActive = "Inactive"
        }
        
        allUsersInPerform.innerHTML += `
        <tr class="users-by-perform">
        <td>${item.id}</td>
        <td><img src="../avatar${index}.png" alt="${item.name}"></td>
        <td>${item.name}<br><small>10x Developer</small></td>
        <td>${item.age}<br></td>
        <td>${item.averageScore}</td>
        <td><span class="status per">${item.isActive}</span></td>
        <td class="top 
        highest-performer"></td>
        </tr> 
        `;
        
        const topInPerform = document.querySelector('.top');
        topInPerform.innerHTML = "🥇 Highest performer";

    })
    
    let statusInDoc = document.querySelectorAll(".status.per");
    
    let statusArr = Array.from(statusInDoc)
    
    statusArr.map((item) => {
    
        
        if (item.innerHTML == "Active") {
            item.classList.add("active");
        }
        else {
            item.classList.add("inactive");
        }
    
    })
}

dashboardMantain();

// fx ===================== handleBasedOnAge

function handleBasedOnAge () {

    console.log(userMainStored);
    
    
    ageGroupsOfAll = {
        under30All: userMainStored.filter((item) => {
            return item.age < 30;
        }),
        over30All: userMainStored.filter((item) => {
            return item.age >= 30;
        })
    }

    console.log(ageGroupsOfAll);

    underThirteeLi.addEventListener("click",() => {
        under30Table.innerHTML +=  "";
        underThirteeDiv.style.display = "block";
        performContent.style.display = "none";
        overThirteeDiv.style.display = "none";
        compareTable.style.display = "none";
        underThirteeLi.classList.add("active");
        performLi.classList.remove("active");
        compareLi.classList.remove("active");
        overThirteeLi.classList.remove("active");
    })
    
    ageGroupsOfAll.under30All.map((item, index) => {
        under30Table.innerHTML += `
        <tr class="users-by-perform">
        <td>${item.id}</td>
        <td><img src="../avatar${index}.png" alt="${item.name}"></td>
        <td>${item.name}<br><small>10x Developer</small></td>
        <td>${item.age}<br></td>
        <td>${item.averageScore}</td>
        <td>${item.isActive}</td>
        </tr> 
        `;
    })
    
    overThirteeLi.addEventListener("click",() => {
        over30Table.innerHTML += "";
        overThirteeDiv.style.display = "block";
        performContent.style.display = "none";
        underThirteeDiv.style.display = "none";
        compareTable.style.display = "none";
        overThirteeLi.classList.add("active");
        underThirteeLi.classList.remove("active");
        performLi.classList.remove("active");
        compareLi.classList.remove("active");
    })
    
    ageGroupsOfAll.over30All.map((item, index) => {
        over30Table.innerHTML += `
        <tr class="users-by-perform">
        <td>${item.id}</td>
        <td><img src="../avatar${index}.png" alt="${item.name}"></td>
        <td>${item.name}<br><small>10x Developer</small></td>
        <td>${item.age}<br></td>
        <td>${item.averageScore}</td>
        <td>${item.isActive}</td>
        </tr> 
        `;
    })

}

handleBasedOnAge();

// fx ===================== compareBooardMantain

function compareBooardMantain () {
    
    result.activeUsers.forEach((item, index) => {
        compareActive.innerHTML += `
        <tr class="users-by-perform">
        <td>${item.id}</td>
        <td><img src="../avatar${index}.png" alt="${item.name}"></td>
        <td>${item.name}<br><small>10x Developer</small></td>
        <td>${item.age}<br></td>
        <td>${item.averageScore}</td>
        <td>${item.isActive}</td>
        </tr> 
        `;
    })
    
    compareTop.innerHTML += `
    <tr class="users-by-perform">
    <td>${result.topPerformer.id}</td>
    <td><img src="../avatar0.png" alt="${result.topPerformer.name}"></td>
    <td>${result.topPerformer.name}<br><small>10x Developer</small></td>
    <td>${result.topPerformer.age}<br></td>
    <td>${result.topPerformer.averageScore}</td>
    <td>${result.topPerformer.isActive}</td>
    </tr> 
    `;
    
    ageGroups.over30.forEach((item, index) => {
        compareOver30.innerHTML += `
        <tr class="users-by-perform">
        <td>${item.id}</td>
        <td><img src="../avatar${index}.png" alt="${item.name}"></td>
        <td>${item.name}<br><small>10x Developer</small></td>
        <td>${item.age}<br></td>
        <td>${item.averageScore}</td>
        <td>${item.isActive}</td>
        </tr> 
        `;
    });

    ageGroups.under30.forEach((item, index) => {
        compareUnder30.innerHTML += `
        <tr class="users-by-perform">
        <td>${item.id}</td>
        <td><img src="../avatar${index}.png" alt="${item.name}"></td>
        <td>${item.name}<br><small>10x Developer</small></td>
        <td>${item.age}<br></td>
        <td>${item.averageScore}</td>
        <td>${item.isActive}</td>
        </tr> 
        `;
    });

}    

compareBooardMantain();







