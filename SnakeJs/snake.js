//global constants
const screenCanvas = document.getElementById('ScreenCanvas');
const ctx = screenCanvas.getContext('2d');
const blockSize = 10;
const snake_colour = '#4ade80';
const background =  '#1a1a1a';
const food_colour = '#f87171';
const canvas_size = { hight: 400, width: 400 };
const delay = ms => new Promise(res => setTimeout(res, ms));

//global variables
var head_direction = {x: 1, y: 0}; 
var next_head_direction = head_direction;
var snake = [{x: 1, y: 20}];
var speed = 100;
var food_position = {x: 0, y:0}
// x: 1 right side 
// x: -1 left side
// x: 0 no movement in x axis 
// y: 1 down
// y: -1 
// y: 0 no movement in y axis

//init logic
ctx.fillStyle = background;
ctx.fillRect(0,0, canvas_size.hight, canvas_size.width);
ctx.fillStyle = snake_colour;

// game logic

// handles keystroke logic
window.addEventListener('keydown', event => {
    switch (event.key.toLowerCase()){
        case 'arrowup':
            if(!(head_direction.x == 0 && head_direction.y == 1)) next_head_direction = {x: 0, y: -1};
            break;
        case 'arrowdown':
            if(!(head_direction.x == 0 && head_direction.y == -1)) next_head_direction = {x: 0, y: 1};
            break;
        case 'arrowleft':
            if(!(head_direction.x == 1 && head_direction.y == 0)) next_head_direction = {x: -1, y: 0};
            break;
        case 'arrowright':
            if(!(head_direction.x == -1 && head_direction.y == 0)) next_head_direction = {x: 1, y: 0};
            break;
        case 'k':
            if(!(head_direction.x == 0 && head_direction.y == 1)) next_head_direction = {x: 0, y: -1};
            break;
        case 'j':
            if(!(head_direction.x == 0 && head_direction.y == -1)) next_head_direction = {x: 0, y: 1};
            break;
        case 'h':
            if(!(head_direction.x == 1 && head_direction.y == 0)) next_head_direction = {x: -1, y: 0};
            break;
        case 'l':
            if(!(head_direction.x == -1 && head_direction.y == 0)) next_head_direction = {x: 1, y: 0};
            break;
    }
});
spawn_fruit();
while(true){
    await delay(speed);
    head_direction = next_head_direction;
    if(!draw_snake()){
        document.getElementById('GameOverOverlay').style.display = 'flex';
        break;
    }
};

//functions
function draw_snake() {
    ctx.fillStyle = snake_colour;

    const previous_head = snake[0];
    const head = {x: previous_head.x + head_direction.x, y: previous_head.y + head_direction.y};

    let index = snake.findIndex(a => a.x === head.x && a.y === head.y);
    if(index >= 0){
        console.log(`New head index: ${index}, Snake: `, snake, "head: ", head);
        return false;
    }
    
    if(head){
        // reset head position when it goes outside the canvas
        if(head.x >= canvas_size.width/blockSize){
            head.x = 0;
        }
        else if(head.y >= canvas_size.hight/blockSize){
            head.y = 0;
        }
        else if(head.x < 0){
            head.x = canvas_size.width/blockSize - 1;
        }
        else if(head.y < 0){
            head.y = canvas_size.hight/blockSize - 1;
        }
        const headposX = head.x * blockSize;
        const headposY = head.y * blockSize;

        ctx.fillRect(headposX, headposY, blockSize, blockSize);
        snake.unshift(head);
    }

    //clear snake tail
    if(!(head.x === food_position.x && head.y === food_position.y)){
        const tail = snake.pop();
        if(tail){
            const tailX = tail.x * blockSize;
            const tailY = tail.y * blockSize;
            ctx.fillStyle = background;
            ctx.fillRect(tailX, tailY, blockSize, blockSize);
        }
    }
    else {
        spawn_fruit();
    }
    return true
};
function spawn_fruit(){
    let x;
    let y;
    do{
        x = Math.floor((Math.random() * (canvas_size.width / blockSize)));
        y = Math.floor(( Math.random() * (canvas_size.hight / blockSize) ));
    } while(snake.some(b => b.x === x && b.y === y))
    ctx.fillStyle = food_colour;
    ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
    food_position = { x: x, y: y};
}

