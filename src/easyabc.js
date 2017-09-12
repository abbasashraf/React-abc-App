import React, { Component } from 'react';
import alphabets from './alphabets.json'
import classNames from "classnames";

class EasyABC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alphabets: alphabets,
            currentPosition: 0,
            currentTick: 0,
            random: false,
            Sound: true
        }
    }

    componentDidMount() {
        let letterSound = document.querySelector(`audio[data-key="letter"]`);
        //   let wordSound = document.querySelector(`audio[data-key="word"]`);
        // console.log(letterSound,wordSound)
        if (this.state.currentPosition === 0) {
            letterSound.currentTime = 0;
            letterSound.play();
        }
    }
    componentDidUpdate() {
        this.playSound();
    }

    mannualPlaySound() {
        let letterSound = document.querySelector(`audio[data-key="letter"]`);
        let wordSound = document.querySelector(`audio[data-key="word"]`);

        if (this.state.currentTick === 0) {
            letterSound.currentTime = 0;
            letterSound.play();
        } else {
            wordSound.currentTime = 0;
            wordSound.play();
        }
        //this.playSound()
    }

    playSound() {
        let letterSound = document.querySelector(`audio[data-key="letter"]`);
        let wordSound = document.querySelector(`audio[data-key="word"]`);
        console.log('play sound')
        if (this.state.Sound) {
            if (this.state.currentTick === 0) {
                letterSound.currentTime = 0;
                letterSound.play();
            } else {
                wordSound.currentTime = 0;
                wordSound.play();
            }
        }

    }
    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    next() {
        // console.log('next button click');
        if (this.state.random) {
            if (this.state.currentTick < 2) {
                this.setState({ currentTick: this.state.currentTick + 1 })
            } else {
                this.setState({ currentPosition: this.randomNumber(0, 25), currentTick: 0 })
            }
        } else {
            if (this.state.currentPosition === this.state.alphabets.length - 1) {
                if (this.state.currentTick < 2) {
                    this.setState({ currentTick: this.state.currentTick + 1 })
                } else {
                    this.setState({ currentPosition: 0, currentTick: 0 })
                }
            } else {
                if (this.state.currentTick < 2) {
                    this.setState({ currentTick: this.state.currentTick + 1 })
                } else {
                    this.setState({ currentPosition: this.state.currentPosition + 1, currentTick: 0 });
                }
            }
            // this.playSound();
        }
    }
    prev() {
        console.log('prev button click');
        if (this.state.currentPosition > 0) {
            this.setState({ currentPosition: this.state.currentPosition - 1 })
        } else {
            this.setState({ currentPosition: this.state.alphabets.length - 1 })
        }
    }

    switchRandom() {
        this.setState({ random: !this.state.random })
        console.log("on offf button")
        // this.next();
    }
    switchSound() {
        this.setState({ Sound: !this.state.Sound })
    }

    render() {
        // console.log(alphabets);
        let showImage = this.state.currentTick !== 0 ? true : false;
        let showWord = this.state.currentTick === 2 ? true : false;

        console.log(this.state.currentTick, showImage)
        console.log(this.state.currentPosition, 'this.state.currentPosition')
        console.log(this.state.currentTick, 'this.state.currentTick')
        return (
            <div className="game">
                <span className="random-label">Random letter</span>
                <label className="switch">
                    <input type="checkbox"
                        defaultValue="true"
                        checked={this.state.random}
                        onClick={this.switchRandom.bind(this)} />
                    <div className="slider round"></div>
                </label>
                <span className="random-label">Sound</span>
                <label className="switch">
                    <input type="checkbox"
                        defaultValue="true"
                        checked={this.state.Sound}
                        onClick={this.switchSound.bind(this)} />
                    <div className="slider round"></div>
                </label>
                <div className="option">
                    <div className="fields">
                        <div className="field-block">
                            {this.state.alphabets[this.state.currentPosition].letter}
                        </div>
                        <audio src={this.state.alphabets[this.state.currentPosition].letterSound}
                            data-key="letter"
                        ></audio>
                    </div>
                    <div className="buttons">
                        <a onClick={this.prev.bind(this)} className="button prev">Previous</a>
                        <a onClick={this.mannualPlaySound.bind(this)} className="button sound">play Sounds</a>
                        <a onClick={this.next.bind(this)} className="button next">Next</a>
                    </div>
                    {/*currentPosition:   {this.state.currentPosition}
                    <br />
                    currentTick:  {this.state.currentTick}*/}

                    <div className="fields">
                        <div className="field-block">
                            <div className="left-field">
                                <div className={classNames('placeholder-span', { hide: showImage })}>Click next to view image</div>
                                <img className={classNames('letter-image', { hide: !showImage })}
                                    alt={this.state.alphabets[this.state.currentPosition].word}
                                    src={this.state.alphabets[this.state.currentPosition].image} />
                                <audio src={this.state.alphabets[this.state.currentPosition].wordSound}
                                    data-key="word"
                                ></audio>
                            </div>
                            <div className="right-field">
                                <div className={classNames('placeholder-span', { hide: showWord })}>Click next to view spelling</div>
                                <div className={classNames('word', { hide: !showWord })}>
                                    {this.state.alphabets[this.state.currentPosition].word.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EasyABC;