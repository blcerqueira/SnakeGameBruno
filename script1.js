function start(){
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    //O math.Floor retira a virgula depois do numero
    //o Math.Random varia o valor de 0 a 1
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
     
}



function criarBG(){
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha(){
    for (i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//5-Criar a comida da cobrinha
    function drawFood(){
        context.fillStyle = "#FFBF00";
        context.fillRect(food.x, food.y, box, box);
    }

//3-Agora vai transmitir o toque da tecla ppara a funcao
document.addEventListener('keydown', update);

function update(event){
    // 37 dir, 38 baixo 39 esquerda 40 cima
    //A cobrinha não pode ir para trás senão pode bugar
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}   


function iniciarJogo(){
    
    //4-deixa passar pela parede e aparecer no outro lado
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    //7-Finalizar jogo
    for(i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Fim do Jogo, a cobra fumou! :´(");
        }
    }


    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //Caso snake x e y for diferente, ele retira o ultimo bloco
    //caso não, ela mantem mais um bloco

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    } else{food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
      
    }


    //1-Vai retirar o ultima elemento do Array
    //snake.pop();
//2-Vai acrescentar um elemento na frente
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100);

alert("Prepare-se, a cobra vai fumar!")
}

