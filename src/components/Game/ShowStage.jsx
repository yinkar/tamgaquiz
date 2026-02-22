import React, { Component } from 'react';
import './ShowStage.scss';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class ShowStage extends Component {
  state = {
    show: false,
    entered: false
  }

  componentDidMount() {
    this.setState({show: true});
    if(this.props.stage <= 4)
      this.timeoutID = setTimeout(this.removeStage, 1200); // how soon we start fading out (1500)
    window.scrollTo(0,0);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutID);
  }

  removeStage = () => {
    this.setState({show: false});
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(this.props.handleShowQuestion, 1000) // how soon we go to question (1000)
  }

  showStage() {
    let stageDescription;
    let stageSecondaryDescription = false;

    if(this.props.stage==1) stageDescription = 'Birini seç';
    else if(this.props.stage==2) { stageDescription = 'Birini seç'; stageSecondaryDescription = 'Ters yön'; }
    else if(this.props.stage==3) stageDescription = 'Cevabı yaz';
    else if(this.props.stage==4) { stageDescription = 'Cevabı yaz'; stageSecondaryDescription = 'Üç tamga birden'; }
    else if(this.props.stage==5)
      return (
        <div className="text-center show-end">
          <h1>Tebrikler!</h1>
          <h3>4 aşamanın tamamını geçtiniz.</h3>
          <h4>Oynamaya devam etmek ister misiniz?</h4>
          <p><button className="btn btn-danger keep-playing" onClick={()=>this.props.lockStage(4)}>Devam et</button></p>
          <p><button className="btn btn-danger back-to-menu" onClick={this.props.handleEndGame}>Menüye dön</button></p>
        </div>
      );

    return (
      <div className="text-center show-stage">
        <h1>Aşama {this.props.stage}</h1>
        <h3>{stageDescription}</h3>
        { stageSecondaryDescription ? <h4>{stageSecondaryDescription}</h4> : '' }
      </div>
    );
  }

  render() {
    const content = this.showStage();
    const { show } = this.state;

    return (
      <CSSTransition classNames="stage" timeout={{enter: 900, exit: 900}} in={show} unmountOnExit>
        {state => content}
      </CSSTransition>
    );
  }
}

export default ShowStage;
