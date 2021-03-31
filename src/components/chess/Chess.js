import React, { Component } from 'react';
import $ from "jquery"
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text, ColoredRect,Image } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';


class URLImage extends React.Component {
  state = {
    image: null
  };
  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener('load', this.handleLoad);
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };
  render() {
    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }}
      />
    );
  }
}

class Chess extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            white: "",
            black: ""
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
         const LionImage = () => {
          const [image] = useImage('https://konvajs.org/assets/lion.png');
          return <Image image={image} />;
        };
        const Board = () => {

        const n = 8;
        const squareSize = 75;
        const boardTopx = 10;
        const boardTopy = 10;
        const boardHeight = boardTopy+squareSize*8
        const boardWidth = boardTopx+squareSize*8

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
                                        <Rect
                                            key={i.toString()+j.toString()}
                                            name={cell}
                                            x={boardTopx+squareSize*i}
                                            y={boardTopy+squareSize*j}
                                            width={squareSize}
                                            height={squareSize}
                                            fill={ j % 2 !== 0 ?  i % 2 !== 0 ? "white" : "black" : i % 2 === 0 ? "white" : "black"}
                                            shadowBlur={2}
                                            onClick={this.handleClick}
                                        />

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
                                           <Image
                                                x={boardTopx+squareSize*i}
                                                y={boardTopy+squareSize*j}
                                                image={"./pieces/bb.svg"}
                                                ref={node => {
                                                    console.log(node)
                                                  this.imageNode = node;
                                                }}
                                              />

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
                <LionImage />
            </React.Fragment>
        )
    }

}

export default Chess;