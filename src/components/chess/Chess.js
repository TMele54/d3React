import React, { Component } from 'react';
import $ from "jquery"
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';

const Material = (d) => {

  const [image] = useImage(d.pth);
  const positions = d.rel
  const position = positions.filter(p => p.cell === d.pos)[0]
  return <Image
            image={image}
            height={d.size}
            width={d.size}
            x={position.x-2}
            y={position.y-2}
            id={d.id}
            onClick={(ev) => selectPiece(ev)}
        />;
};
const selectPiece = (d) => {
    console.log(d.target.attrs)
};
const updatePosition = (d) => {

};

class Chess extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            white: [
                {"player": "w", "id": "w0", "svg": "wp.svg", "pos": "a2"},
                {"player": "w", "id": "w1", "svg": "wp.svg", "pos": "b2"},
                {"player": "w", "id": "w2", "svg": "wp.svg", "pos": "c2"},
                {"player": "w", "id": "w3", "svg": "wp.svg", "pos": "d2"},
                {"player": "w", "id": "w4", "svg": "wp.svg", "pos": "e2"},
                {"player": "w", "id": "w5", "svg": "wp.svg", "pos": "f2"},
                {"player": "w", "id": "w6", "svg": "wp.svg", "pos": "g2"},
                {"player": "w", "id": "w7", "svg": "wp.svg", "pos": "h2"},
                {"player": "w", "id": "w8", "svg": "wr.svg", "pos": "a1"},
                {"player": "w", "id": "w9", "svg": "wr.svg", "pos": "h1"},
                {"player": "w", "id": "w10", "svg": "wn.svg", "pos": "b1"},
                {"player": "w", "id": "w11", "svg": "wn.svg", "pos": "g1"},
                {"player": "w", "id": "w12", "svg": "wb.svg", "pos": "c1"},
                {"player": "w", "id": "w13", "svg": "wb.svg", "pos": "f1"},
                {"player": "w", "id": "w14", "svg": "wq.svg", "pos": "d1"},
                {"player": "w", "id": "w15", "svg": "wk.svg", "pos": "e1"}
                ],
            black: [
                {"player": "b", "id": "b0", "svg": "bp.svg", "pos": "a7"},
                {"player": "b", "id": "b1", "svg": "bp.svg", "pos": "b7"},
                {"player": "b", "id": "b2", "svg": "bp.svg", "pos": "c7"},
                {"player": "b", "id": "b3", "svg": "bp.svg", "pos": "d7"},
                {"player": "b", "id": "b4", "svg": "bp.svg", "pos": "e7"},
                {"player": "b", "id": "b5", "svg": "bp.svg", "pos": "f7"},
                {"player": "b", "id": "b6", "svg": "bp.svg", "pos": "g7"},
                {"player": "b", "id": "b7", "svg": "bp.svg", "pos": "h7"},
                {"player": "b", "id": "b8", "svg": "br.svg", "pos": "a8"},
                {"player": "b", "id": "b9", "svg": "br.svg", "pos": "h8"},
                {"player": "b", "id": "b10", "svg": "bn.svg", "pos": "b8"},
                {"player": "b", "id": "b11", "svg": "bn.svg", "pos": "g8"},
                {"player": "b", "id": "b12", "svg": "bb.svg", "pos": "c8"},
                {"player": "b", "id": "b13", "svg": "bb.svg", "pos": "f8"},
                {"player": "b", "id": "b14", "svg": "bq.svg", "pos": "d8"},
                {"player": "b", "id": "b15", "svg": "bk.svg", "pos": "e8"}
                ],
            moves: [{"id": "", "source": "", "target": ""}],
            positions: []
        }
        const rules = `
    Kings move one square in any direction, so long as that square is not attacked by an enemy piece. Additionally, kings are able to make a special move, know as castling.
    Queens move diagonally, horizontally, or vertically any number of squares. They are unable to jump over pieces.
    Rooks move horizontally or vertically any number of squares. They are unable to jump over pieces. Rooks move when the king castles.
    Bishops move diagonally any number of squares. They are unable to jump over pieces.
    Knights move in an ‘L’ shape’: two squares in a horizontal or vertical direction, then move one square horizontally or vertically. They are the only piece able to jump over other pieces.
    Pawns move vertically forward one square, with the option to move two squares if they have not yet moved. Pawns are the only piece to capture different to how they move. Pawns capture one square diagonally in a forward direction.
    Pawns are unable to move backward on captures or moves. Upon reaching the other side of the board a pawn promotes into any other piece, except for a king. Additionally, pawns can make a special move named En Passant.
`
        this.clickTile = this.clickTile.bind(this)
    }

    async componentDidMount() {
        // First draw is based on json data, subsequent redraws are generated at random
        await fetch("data/data.json").then(response => response.json()).then(data => {

        });
    }

    clickTile = (d) => {
        console.log(d.target.attrs.name)
        console.log(d.target._id)
    };

    render() {

        const Board = () => {

            const chessmen = [...this.state.black, ...this.state.white]; 
            const n = 8;
            const squareSize = 75;
            const chessmenSize = 80;
            const boardTopx = 10;
            const boardTopy = 10;
            const boardHeight = boardTopy+squareSize*8+10;
            const boardWidth = boardTopx+squareSize*8+10;
            const A = "#D18B47";
            const B = "#FFCE9E";
            const transpose = a => a[0].map((_, c) => a.map(r => r[c]));
            const alpha = ["a", "b", "c", "d", "e", "f", "g", "h"]
            const numeric = ["8", "7", "6", "5", "4", "3", "2", "1"]
            const mapp = alpha.flatMap(d => numeric.map(v => d + v))
            const chessboard = new Array(Math.ceil(mapp.length / n)).fill().map(_ => mapp.splice(0, n))
            const field = chessboard[0].map((_, colIndex) => chessboard.map(row => row[colIndex])); 
            const grid = transpose(field)

            const Myboard = (chessboard) => {
                const grid = chessboard.board.grid;

                return(
                    <Stage height={boardHeight} width={boardWidth} key={"STAGE"}>
                        <Layer key={"BOARD"}>
                            {grid.map((row, i) => (
                                <React.Fragment>
                                    {row.reverse().map((cell, j) => {
                                        this.state.positions.push({"cell": cell, "x": boardTopx+squareSize*i, "y": boardTopy+squareSize*j})
                                        return(
                                            <React.Fragment>
                                                <Rect
                                                    key={i.toString()+j.toString()}
                                                    name={cell}
                                                    x={boardTopx+squareSize*i}
                                                    y={boardTopy+squareSize*j}
                                                    width={squareSize}
                                                    height={squareSize}
                                                    fill={ j % 2 !== 0 ?  i % 2 !== 0 ? A : B : i % 2 === 0 ? A : B}
                                                    shadowBlur={2}
                                                    onClick={this.clickTile}
                                                />
                                                {/*<Text text={cell} fontSize={15} x={boardTopx+squareSize*i} y={boardTopy+squareSize*j} />*/}
                                            </React.Fragment>
                                        )
                                    })}
                                </React.Fragment>
                            ))}
                        </Layer>
                        <Layer key={"PIECES"}>
                            {chessmen.map((d, i) => {
                                return (
                                    <Material
                                        pth={'./pieces/'+d.svg}
                                        pos={d.pos}
                                        rel={this.state.positions}
                                        id={d.id}
                                        size={chessmenSize}
                                    />
                                )
                            })}
                        </Layer>
                    </Stage>
                )

            }

            return(
                <React.Fragment>
                    <Myboard board={{grid}} />
                </React.Fragment>
            )
       }
       
        return(
            <React.Fragment>
                <Board />
            </React.Fragment>
        )
    }

}

export default Chess;