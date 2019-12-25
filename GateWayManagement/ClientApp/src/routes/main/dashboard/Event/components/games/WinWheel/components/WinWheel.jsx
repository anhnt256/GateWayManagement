import React, { Component } from 'react';
import Sound from 'react-sound';
import Winwheel from '../../../../../../../../assets/js/Winwheel';
import { TweenMax } from 'gsap/TweenMax'; // important. Need for WinWheel working. Please don't remove

import imgQuaySoBtn from '../images/quayso-btn.png';
import imgQuaySoBtnDisable from '../images/quayso-btn-disable.png';
import imgVongQuaySegmentOne from '../images/1h.png';
import imgVongQuaySegmentTwo from '../images/2h.png';
import imgVongQuaySegmentThree from '../images/5h.png';
import imgVongQuaySegmentFour from '../images/food.png';
import imgVongQuaySegmentFive from '../images/drink.png';
import imgVongQuaySegmentSix from '../images/50percent.png';
import imgVongQuaySegmentSeven from '../images/100percent.png';
import imgVongQuaySegmentEight from '../images/200percent.png';
import jingleBellsSound from '../audio/jingle bells.mp3';
import { connect } from 'react-redux';
import { calcPrize } from '../actions';

let theWheel;
class WinWheel extends Component {
  state = {
    soundStatus: Sound.status.STOPPED,
  };

  componentDidMount() {
    this.initTheWheel();
    theWheel.rotationAngle = 0;
    theWheel.draw();
  }

  initTheWheel = () => {
    theWheel = new Winwheel({
      canvasId: 'canvas',
      numSegments: 8,
      outerRadius: 580,
      drawMode: 'segmentImage',
      responsive: true,
      drawText: true, // Need to set this true if want code-drawn text on image wheels.
      textFontSize: 0,
      textOrientation: 'curved',
      textFontWeight: 'normal',
      textAlignment: 'outer',
      textMargin: 30,
      textFontFamily: 'Courier, Roboto, sans-serif',
      textFillStyle: 'white',
      segments: [
        { image: imgVongQuaySegmentOne, text: '1h chơi' },
        { image: imgVongQuaySegmentTwo, text: '2h chơi' },
        { image: imgVongQuaySegmentThree, text: '5h chơi' },
        { image: imgVongQuaySegmentFour, text: 'Đồ ăn' },
        { image: imgVongQuaySegmentFive, text: 'Nước uống' },
        { image: imgVongQuaySegmentSix, text: '50% giờ chơi' },
        { image: imgVongQuaySegmentSeven, text: '100% giờ' },
        { image: imgVongQuaySegmentEight, text: '200% giờ' },
      ],
      animation: {
        type: 'spinOngoing',
        duration: 19,
        spins: 16,
        callbackFinished: this.onSpinComplete,
      },
    });
  };

  onSpin = async () => {
    const { round, wheelSpinning, updateState } = this.props;
    if (!wheelSpinning && round > 0) {
      const { calcPrize } = this.props;
      updateState(true);
      this.setState({ soundStatus: Sound.status.PLAYING });
      theWheel.startAnimation();
      let result = await calcPrize();
      setTimeout(function() {
        let stopAt = theWheel.getRandomForSegment(result.data.reply);
        theWheel.draw();
        theWheel.animation.type = 'spinToStop';
        theWheel.animation.easing = 'Power1.easeOut';
        theWheel.animation.repeat = 0;
        theWheel.animation.stopAngle = stopAt;
        theWheel.animation.duration = 3;
        theWheel.startAnimation();
      }, 16000);
    }
  };

  onSpinComplete = () => {
    // Call getIndicatedSegment() function to return pointer to the segment pointed to on wheel.
    const winningSegment = theWheel.getIndicatedSegment();
    // Basic alert of the segment text which is the prize name.
    alert(`Chúc mừng bạn đã trúng ${winningSegment.text}!`);
    this.onReset();
  };

  onReset = () => {
    theWheel.stopAnimation(false);
    theWheel.animation.type = 'spinOngoing';
    theWheel.animation.duration = 19;
    theWheel.rotationAngle = 0;
    theWheel.draw();
    clearTimeout();
    this.setState({ soundStatus: Sound.status.STOPPED });
    this.props.updateState(false);
  };

  render() {
    const { soundStatus } = this.state;
    const { canvasId = 'canvas', canvasWidth = 870, canvasHeight = 870, round, wheelSpinning } = this.props;
    return (
      <React.Fragment>
        <canvas id={canvasId} className="winwheel" width={canvasWidth} height={canvasHeight}>
          Canvas not supported, use another browser.
        </canvas>
        <img
          id="spin_button"
          src={wheelSpinning || round <= 0 ? imgQuaySoBtnDisable : imgQuaySoBtn}
          className="img-fluid mx-auto d-block"
          width="130"
          alt="Spin"
          onClick={this.onSpin}
        />
        <Sound url={jingleBellsSound} playStatus={soundStatus} />
      </React.Fragment>
    );
  }
}

export default connect(null, {
  calcPrize,
})(WinWheel);
