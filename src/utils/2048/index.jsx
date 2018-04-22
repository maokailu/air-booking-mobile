import React from 'react';
import './style.scss';
import Tile from './Tile.jsx';

let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;
let grid = JSON.parse(localStorage.getItem('grid')) || [];
let gameOver = false;
let score = 0;
let bestScore = localStorage.getItem('bestscore') || 0;
let animX = -1;
let animY = -1;
export default class Game2048 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: JSON.parse(localStorage.getItem('grid')) || []
        };
    }

    componentWillMount() {
        // this.state.grid.length === 0 && this.initialGrid();
        this.initialGrid();
    }

    restart = () => {
        score = 0;
        this.initialGrid();
    };
    initialGrid = () => {
        grid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

        // grid = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
        gameOver = false;
        let cells1 = this.availableCells();
        this.getRandomNum(cells1);
        let cells2 = this.availableCells();
        this.getRandomNum(cells2);
        this.setState({
            grid: grid
        });
    };
    availableCells = () => {
        let cells = [];
        grid.map((row, x) => {
            row.map((cell, y) => {
                if (!cell) {
                    cells.push({ x: x, y: y });
                }
            });
        });
        if (!cells.length) {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (
                        (j < 3 ? grid[i][j] === grid[i][j + 1] : false) ||
                        (j > 0 ? grid[i][j] === grid[i][j - 1] : false) ||
                        (i > 0 ? grid[i - 1][j] === grid[i][j] : false) ||
                        (i < 3 ? grid[i + 1][j] === grid[i][j] : false)
                    ) {
                        gameOver = false;
                    }
                }
            }
        }
        return cells;
    };
    getRandomNum = cells => {
        let i = Math.floor(Math.random() * cells.length);
        let newTileText = Math.random() < 0.9 ? 2 : 2;
        let x = cells[i].x;
        let y = cells[i].y;
        grid[x][y] = newTileText;
    };
    getDirection = (startX, startY, endX, endY) => {
        let moveX = endX - startX;
        let moveY = endY - startY;
        let direction = -1;
        if (Math.abs(moveX) < 2 && Math.abs(moveY) < 2) {
            return direction;
        }
        let angle = Math.atan2(moveY, moveX) * 180 / Math.PI;
        if (angle >= -135 && angle <= -45) {
            direction = 0;
        } else if (angle > -45 && angle < 45) {
            direction = 1;
        } else if (angle >= 45 && angle <= 135) {
            direction = 2;
        } else {
            direction = 3;
        }
        return direction;
    };
    touchStartHandler = event => {
        startX = event.targetTouches[0].pageX;
        startY = event.targetTouches[0].pageY;
    };
    touchEndHandler = event => {
        endX = event.changedTouches[0].pageX;
        endY = event.changedTouches[0].pageY;
        let direction = this.getDirection(startX, startY, endX, endY);
        this.caculateGird(direction);
        let cells = this.availableCells();
        if (cells.length) {
            this.getRandomNum(cells);
        }
        this.setState({
            grid: grid
        });
    };
    // 1.执行多次崩溃 2.逻辑优化代码优化 3.将04改为变量 不一定是4*4的表格 4.修改样式后刷新好几次
    caculateGird = direction => {
        for (let i = 0; i < 4; i++) {
            let j = 0;
            let k = 0;
            let condition1 = true;
            let condition2 = true;
            switch (direction) {
            case 0:
                j = 0;
                k = 1;
                break;
            case 1:
                j = 3;
                k = 2;
                break;
            case 2:
                j = 3;
                k = 2;
                break;
            case 3:
                j = 0;
                k = 1;
                break;
            }
            while (condition1) {
                label1: while (condition2) {
                    switch (direction) {
                    case 0:
                        if (grid[j][i] === 0) {
                            grid[j][i] = grid[k][i];
                            grid[k][i] = 0;
                        } else if (grid[j][i] === grid[k][i]) {
                            grid[j][i] = grid[k][i] * 2;
                            animX = j;
                            animY = i;
                            grid[k][i] = 0;
                            score += grid[j][i];
                            break label1;
                        }
                        k++;
                        condition2 = k < 4;
                        break;
                    case 1:
                        if (grid[i][j] === 0) {
                            grid[i][j] = grid[i][k];
                            grid[i][k] = 0;
                        } else if (grid[i][j] === grid[i][k]) {
                            grid[i][j] = grid[i][k] * 2;
                            animX = i;
                            animY = j;
                            grid[i][k] = 0;
                            score += grid[i][j];
                            break label1;
                        }
                        k--;
                        condition2 = k >= 0;
                        break;
                    case 2:
                        if (grid[j][i] === 0) {
                            grid[j][i] = grid[k][i];
                            grid[k][i] = 0;
                        } else if (grid[j][i] === grid[k][i]) {
                            grid[j][i] = grid[k][i] * 2;
                            animX = j;
                            animY = i;
                            grid[k][i] = 0;
                            score += grid[j][i];
                            break label1;
                        }
                        k--;
                        condition2 = k >= 0;
                        break;
                    case 3:
                        if (grid[i][j] === 0) {
                            grid[i][j] = grid[i][k];
                            grid[i][k] = 0;
                        } else if (grid[i][j] === grid[i][k]) {
                            grid[i][j] = grid[i][k] * 2;
                            animX = i;
                            animY = j;
                            grid[i][k] = 0;
                            score += grid[i][j];
                            break label1;
                        }
                        k++;
                        condition2 = k < 4;
                        break;
                    }
                }
                switch (direction) {
                case 0:
                    j++;
                    k = j + 1;
                    condition1 = j < 3;
                    condition2 = k < 4;
                    break;
                case 1:
                    j--;
                    k = j - 1;
                    condition1 = j >= 1;
                    condition2 = k >= 0;
                    break;
                case 2:
                    j--;
                    k = j - 1;
                    condition1 = j >= 1;
                    condition2 = k >= 0;
                    break;
                case 3:
                    j++;
                    k = j + 1;
                    condition1 = j < 3;
                    condition2 = k < 4;
                    break;
                }
            }
        }
    };
    render() {
        score > bestScore ? (bestScore = score) : bestScore;
        localStorage.setItem('bestscore', bestScore);
        localStorage.setItem('grid', JSON.stringify(this.state.grid));
        return (
            <div className="game-container">
                {
                    <div>
                        <div className="heading">
                            <span className="title">2048</span>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div className="score">
                                    <span className="tit">SCORE</span> <span>{score}</span>
                                </div>
                                <div className="best-score">
                                    <span className="tit">BEST</span> <span>{bestScore}</span>
                                </div>
                            </div>
                        </div>
                        <div className="above-game">
                            <span className="tit">Join the numbers and get to the 2048 tile!</span>
                            <div className="restart" onClick={this.restart}>
                                New Game
                            </div>
                        </div>
                    </div>
                }
                <div
                    className="grid"
                    onTouchStart={!gameOver ? this.touchStartHandler : null}
                    onTouchEnd={!gameOver ? this.touchEndHandler : null}
                >
                    {this.state.grid.map((row, rowIndex) => (
                        <div className="row" key={rowIndex}>
                            {row.map((cell, columnIndex) => (
                                <div className="tr-container" key={rowIndex * 4 + columnIndex + 1}>
                                    {this.state.grid[rowIndex][columnIndex] !== 0 && (
                                        <Tile
                                            num={cell}
                                            anim={animX === rowIndex && animY === columnIndex ? true : null}
                                        />
                                    )}
                                    <div className="cell" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                {gameOver && (
                    <div className="wrapper">
                        <div className="game-over">Game Over</div>
                    </div>
                )}
            </div>
        );
    }
}

// todolists:
// localstorage:grid gameover 卡主
// 动画
// 移动动画：是计算表格还是该方向所有移动