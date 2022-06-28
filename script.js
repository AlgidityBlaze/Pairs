/* ПЛАН
1. Обрати поле +
2. заповнити його картками +
3. присвоїти коміркам картинки +
4. написати скріпт для їх перемішування 
4.1. зробити картинку клікабельною +
4.2. при кліку по карці перевертати її +
5. написати логіку вибору та порівняння карток та їх виключення +
5.1. якщо обрано дві однакові картки то вони видаляються +
6. при закінченні карток відобразити вікно з привітанням та кнопкою ресет
*/

var cardsField = document.querySelector("#cards");
var resetBlock = document.querySelector("#reset"); 
var resetBtn = document.querySelector("#reset-btn");
console.dir(cardsField);

var countCards = 36;
var selected = [];
var deletedCards = 0;
var pause = false;

//створення масиву в вказаному діапазоні чисел з виключенням повторень
for (var  randomImage1 = [], i = 0; i < 18; ++i) randomImage1[i] = i; 
function shuffle(array) {
    var tmp, current, top = array.length;
    if (top) while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    } return array;
}    randomImage1 = shuffle(randomImage1);

// дублюючий масив 
for (var  randomImage2 = [], i = 0; i < 18; ++i) randomImage2[i] = i; 
function shuffle(array2) {
    var tmp2, current2, top2 = array2.length;
    if (top2) while (--top2) {
        current2 = Math.floor(Math.random() * (top2 + 1));
        tmp2 = array2[current2];
        array2[current2] = array2[top2];
        array2[top2] = tmp2;
    } return array2; 
}   randomImage2 = shuffle(randomImage2);

// об'єднання масивів задля забезпечення пар випадково розміщенних в масиві
const randomImage = [...randomImage1, ...randomImage2];
console.log(randomImage);
console.log(randomImage1);
console.log(randomImage2); 

// створення комірок в залежності від кількості вказаних комірок
for (var i = 0; i < countCards; i = i + 1){
    var li = document.createElement("li");
        li.id = i;
    cardsField.appendChild(li);
}

// функція перевертання обраної картки та перевірка їх на збіжність
cardsField.onclick = function (event) {
    if (pause == false) {
        var element = event.target;
    if (element.tagName == "LI" && element.className != "active") {
        selected.push(element);
        element.className = "active"
        var img = randomImage[element.id];
        element.style.backgroundImage = "url(images/"+ img +".png)"; 
        if (selected.length == 2) {
            pause = true;

                // перевірка карток, коли вони збігається - їх видаляють
            if ( randomImage[selected[0].id] == randomImage[selected[1].id] ) {
                 selected[0].style.visibility = "hidden";
                 selected[1].style.visibility = "hidden";
                deletedCards = deletedCards + 2;
            }
            setTimeout(refreshCards, 600); //затримка перед перевертанням карток назад, якщо вони не збіглись
        }
    }
    
    }
    
}
// функція закінчення гри та показу вікна з привітанням та кнопкою "релод"
function refreshCards() {
    for (var i = 0; i < countCards; i = i + 1) {
        cardsField.children[i].className = "";
        cardsField.children[i].style.backgroundImage = 'url("images/back.png")';
    }
    if (deletedCards == countCards) {
        resetBlock.style.display = "block";
    }
    selected = [];
    pause = false;
}
// функція перезапуску сторінки при натиску на кнопку "релод"
resetBtn.onclick = function () {
    location.reload();
}