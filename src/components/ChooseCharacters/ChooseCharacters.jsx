import React, { Component } from 'react';
import Switch from 'react-toggle-switch';
import { tamgaDictionary } from '../../data/tamgaDictionary';
import './ChooseCharacters.scss';
import CharacterGroup from './CharacterGroup';

class ChooseCharacters extends Component {
  state = {
    errMsg : '',
    selectedGroups: this.props.selectedGroups,
    showAlternatives: [],
    showSimilars: [],
    startIsVisible: true
  }

  componentDidMount() {
    this.testIsStartVisible();
    window.addEventListener('resize', this.testIsStartVisible);
    window.addEventListener('scroll', this.testIsStartVisible);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.testIsStartVisible);
    window.removeEventListener('scroll', this.testIsStartVisible);
  }

  componentDidUpdate(prevProps, prevState) {
    this.testIsStartVisible();
  }

  testIsStartVisible = () => {
    if(this.startRef) {
      const rect = this.startRef.getBoundingClientRect();
      if(rect.y > window.innerHeight && this.state.startIsVisible)
        this.setState({ startIsVisible: false });
      else if(rect.y <= window.innerHeight && !this.state.startIsVisible)
        this.setState({ startIsVisible: true });
    }
  }

  scrollToStart() {
    if(this.startRef) {
      const rect = this.startRef.getBoundingClientRect();
      const absTop = rect.top + window.pageYOffset;
      const scrollPos = absTop - window.innerHeight + 50;
      window.scrollTo(0, scrollPos > 0 ? scrollPos : 0);
    }
  }

  getIndex(groupName) {
    return this.state.selectedGroups.indexOf(groupName);
  }

  isSelected(groupName) {
    return this.getIndex(groupName) > -1 ? true : false;
  }

  removeSelect(groupName) {
    if(this.getIndex(groupName)<0)
      return;
    let newSelectedGroups = this.state.selectedGroups.slice();
    newSelectedGroups.splice(this.getIndex(groupName), 1);
    this.setState({selectedGroups: newSelectedGroups});
  }

  addSelect(groupName) {
    this.setState({errMsg: '', selectedGroups: this.state.selectedGroups.concat(groupName)});
  }

  toggleSelect = groupName => {
    if(this.getIndex(groupName) > -1)
      this.removeSelect(groupName);
    else
      this.addSelect(groupName);
  }

  selectAll(whichScript, altOnly=false) {
    const thisScript = tamgaDictionary[whichScript];
    let newSelectedGroups = this.state.selectedGroups.slice();
    Object.keys(thisScript).forEach(groupName => {
      if(!this.isSelected(groupName) && (
        (altOnly && groupName.endsWith('_a')) ||
        (!altOnly)
      ))
        newSelectedGroups.push(groupName);
    });
    this.setState({errMsg: '', selectedGroups: newSelectedGroups});
  }

  selectNone(whichScript, altOnly=false) {
    let newSelectedGroups = [];
    this.state.selectedGroups.forEach(groupName => {
      let mustBeRemoved = false;
      Object.keys(tamgaDictionary[whichScript]).forEach(removableGroupName => {
        if(removableGroupName === groupName && (
          (altOnly && groupName.endsWith('_a')) ||
          (!altOnly)
        ))
          mustBeRemoved = true;
      });
      if(!mustBeRemoved)
        newSelectedGroups.push(groupName);
    });
    this.setState({selectedGroups: newSelectedGroups});
  }

  toggleAlternative(whichScript) {
    let show = this.state.showAlternatives.slice();
    const idx = show.indexOf(whichScript);
    if(idx >= 0)
      show.splice(idx, 1);
    else
      show.push(whichScript);
    this.setState({showAlternatives: show});
  }

  getSelectedAlternatives(whichScript) {
    const prefix = whichScript === 'orkhon' ? 'o_' : 'y_';
    return this.state.selectedGroups.filter(groupName => {
      return groupName.startsWith(prefix) && groupName.endsWith('_a');
    }).length;
  }

  getAmountOfAlternatives(whichScript) {
    return Object.keys(tamgaDictionary[whichScript]).filter(groupName => {
      return groupName.endsWith('_a');
    }).length;
  }

  alternativeToggleRow(whichScript, show) {
    let checkBtn = "glyphicon glyphicon-small glyphicon-"
    let status;
    if(this.getSelectedAlternatives(whichScript) >= this.getAmountOfAlternatives(whichScript))
      status = 'check';
    else if(this.getSelectedAlternatives(whichScript) > 0)
      status = 'check half';
    else
      status = 'unchecked'
    checkBtn += status

    return <div
      key={'alt_toggle_' + whichScript}
      onClick={() => this.toggleAlternative(whichScript)}
      className="choose-row"
    >
      <span
        className={checkBtn}
        onClick={ e => {
          if(status == 'check')
            this.selectNone(whichScript, true);
          else if(status == 'check half' || status == 'unchecked')
            this.selectAll(whichScript, true);
          e.stopPropagation();
        }}
      ></span>
      {
        show ? <span className="toggle-caret">&#9650;</span>
          : <span className="toggle-caret">&#9660;</span>
      }
      Küme sesler (lt · nt · nč · aš..)
    </div>
  }

  showGroupRows(whichScript, showAlternatives) {
    const thisScript = tamgaDictionary[whichScript];
    let rows = [];
    let altToggleInserted = false;
    Object.keys(thisScript).forEach((groupName, idx) => {
      if(groupName.endsWith('_a') && !altToggleInserted) {
        rows.push(this.alternativeToggleRow(whichScript, showAlternatives));
        altToggleInserted = true;
      }

      if(!groupName.endsWith('_a') || showAlternatives) {
        rows.push(<CharacterGroup
          key={idx}
          groupName={groupName}
          selected={this.isSelected(groupName)}
          characters={thisScript[groupName].characters}
          handleToggleSelect={this.toggleSelect}
        />);
      }
    });

    return rows;
  }

  startGame() {
    if(this.state.selectedGroups.length < 1) {
      this.setState({ errMsg: 'En az bir grup seçin!'});
      return;
    }
    this.props.handleStartGame(this.state.selectedGroups);
  }

  render() {
    return (
      <div className="choose-characters">
        <div className="row">
          <div className="col-xs-12">
            <div className="panel panel-default">
              <div className="panel-body welcome">
                <h4>Tamga Quiz'e Hoş Geldiniz!</h4>
                <p>Çalışmak istediğiniz harf gruplarını seçin.</p>
                <p className="text-muted" style={{fontSize:'12px'}}>Based on <a href="https://kana.pro" target="_blank" rel="noopener noreferrer">kana.pro</a> by Antti Pilto (MIT)</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="panel panel-default">
              <div className="panel-heading">Orhon · 𐰖𐰕𐰸𐰞𐱃</div>
              <div className="panel-body selection-areas">
                {this.showGroupRows('orkhon', this.state.showAlternatives.indexOf('orkhon') >= 0)}
              </div>
              <div className="panel-footer text-center">
                <a href="javascript:;" onClick={()=>this.selectAll('orkhon')}>Tümü</a> &nbsp;&middot;&nbsp; <a href="javascript:;"
                  onClick={()=>this.selectNone('orkhon')}>Hiçbiri</a>
                &nbsp;&middot;&nbsp; <a href="javascript:;" onClick={()=>this.selectAll('orkhon', true)}>Tüm kümeler</a>
                &nbsp;&middot;&nbsp; <a href="javascript:;" onClick={()=>this.selectNone('orkhon', true)}>Küme yok</a>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="panel panel-default">
              <div className="panel-heading">Yenisey · 𐰁𐰄𐰅𐰈</div>
              <div className="panel-body selection-areas">
                {this.showGroupRows('yenisei', this.state.showAlternatives.indexOf('yenisei') >= 0)}
              </div>
              <div className="panel-footer text-center">
                <a href="javascript:;" onClick={()=>this.selectAll('yenisei')}>Tümü</a> &nbsp;&middot;&nbsp; <a href="javascript:;"
                  onClick={()=>this.selectNone('yenisei')}>Hiçbiri
                </a>
                &nbsp;&middot;&nbsp; <a href="javascript:;" onClick={()=>this.selectAll('yenisei', true)}>Tüm kümeler</a>
                &nbsp;&middot;&nbsp; <a href="javascript:;" onClick={()=>this.selectNone('yenisei', true)}>Küme yok</a>
              </div>
            </div>
          </div>
          <div className="col-sm-3 col-xs-12 pull-right">
            <span className="pull-right lock">Lock to stage &nbsp;
              {
                this.props.isLocked &&
                  <input className="stage-choice" type="number" min="1" max="4" maxLength="1" size="1"
                    onChange={(e)=>this.props.lockStage(e.target.value, true)}
                    value={this.props.stage}
                  />
              }
              <Switch onClick={()=>this.props.lockStage(1)} on={this.props.isLocked} /></span>
          </div>
          <div className="col-sm-offset-3 col-sm-6 col-xs-12 text-center">
            {
              this.state.errMsg != '' &&
                <div className="error-message">{this.state.errMsg}</div>
            }
            <button ref={c => this.startRef = c} className="btn btn-danger startgame-button" onClick={() => this.startGame()}>Quiz'i Başlat!</button>
          </div>
          <div className="down-arrow"
            style={{display: this.state.startIsVisible ? 'none' : 'block'}}
            onClick={(e) => this.scrollToStart(e)}
          >
            Start
          </div>
        </div>
      </div>
    );
  }
}

export default ChooseCharacters;
