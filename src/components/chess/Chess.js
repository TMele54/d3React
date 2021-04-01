import React, { Component } from 'react';
import $ from "jquery"
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';

const PieceImage = (d) => {
  const [image] = useImage(d.pth);
  return <Image image={image} height={80} width={80} x={6} y={5}/>;
};
class Chess extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            white: [
                {"svg": "wp.svg", "pos": "a2"},
                {"svg": "wp.svg", "pos": "b2"},
                {"svg": "wp.svg", "pos": "c2"},
                {"svg": "wp.svg", "pos": "d2"},
                {"svg": "wp.svg", "pos": "e2"},
                {"svg": "wp.svg", "pos": "f2"},
                {"svg": "wp.svg", "pos": "g2"},
                {"svg": "wp.svg", "pos": "h2"},
                {"svg": "wr.svg", "pos": "a1"},
                {"svg": "wr.svg", "pos": "h1"},
                {"svg": "wk.svg", "pos": "b1"},
                {"svg": "wk.svg", "pos": "g1"},
                {"svg": "wb.svg", "pos": "c1"},
                {"svg": "wb.svg", "pos": "f1"},
                {"svg": "wn.svg", "pos": "d1"},
                {"svg": "wq.svg", "pos": "e1"}
                ],
            black: [
                {"svg": "bp.svg", "pos": "a7"},
                {"svg": "bp.svg", "pos": "b7"},
                {"svg": "bp.svg", "pos": "c7"},
                {"svg": "bp.svg", "pos": "d7"},
                {"svg": "bp.svg", "pos": "e7"},
                {"svg": "bp.svg", "pos": "f7"},
                {"svg": "bp.svg", "pos": "g7"},
                {"svg": "bp.svg", "pos": "h7"},
                {"svg": "br.svg", "pos": "a8"},
                {"svg": "br.svg", "pos": "h8"},
                {"svg": "bk.svg", "pos": "b8"},
                {"svg": "bk.svg", "pos": "g8"},
                {"svg": "bb.svg", "pos": "c8"},
                {"svg": "bb.svg", "pos": "f8"},
                {"svg": "bn.svg", "pos": "d8"},
                {"svg": "bq.svg", "pos": "e8"}
                ],
            positions: [
                {},
            ]
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
       // this.Board = this.Board.bind(this)
    }

    async componentDidMount() {
        // First draw is based on json data, subsequent redraws are generated at random
        await fetch('data/data.json').then(response => response.json()).then(data => {

        });
    }

    handleClick = (d) => {
        console.log(d.target.attrs.name)
        console.log(d.target._id)

    };

    render() {
        const Board = () => {

        const n = 8;
        const squareSize = 75;
        const boardTopx = 10;
        const boardTopy = 10;
        const boardHeight = boardTopy+squareSize*8+10;
        const boardWidth = boardTopx+squareSize*8+10;
        const A = "#D18B47";
        const B = "#FFCE9E";

        const alpha = ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a']
        const numeric = ["1", "2", "3", "4", "5", "6", "7", "8"]
        const mapp = alpha.flatMap(d => numeric.map(v => d + v))
        const chessboard = new Array(Math.ceil(mapp.length / n)).fill().map(_ => mapp.splice(0, n))
        const grid = chessboard[0].map((_, colIndex) => chessboard.map(row => row[colIndex]));

        const Myboard = (chessboard) => {
            const grid = chessboard.board.grid;

            return(
                <Stage height={boardHeight} width={boardWidth} key={"STAGE"}>
                    <Layer key={"BOARD"}>
                        {grid.map((row, i) => (
                            <React.Fragment>
                                {row.reverse().map((cell, j) => {
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
                                                onClick={this.handleClick}
                                            />
                                            <Text text={cell} fontSize={15} x={boardTopx+squareSize*i} y={boardTopy+squareSize*j} />
                                        </React.Fragment>
                                    )
                                })}
                            </React.Fragment>
                        ))}
                    </Layer>
                    <Layer key={"PIECES"}>
                        {grid.map((row, i) => (
                            <React.Fragment>
                                {row.reverse().map((cell, j) => {
                                    return(
                                        <PieceImage pth={'./pieces/bb.svg'} />
                                     )
                                })}
                            </React.Fragment>
                        ))}
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