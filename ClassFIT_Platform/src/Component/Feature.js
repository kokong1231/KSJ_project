import React, { Component, Fragment } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import '../App.css';
import { Redirect, Link } from 'react-router-dom';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/python/python';
import ProgressMenu from './ProgressMenu';

class Feature extends Component {

    state = {
        csrfAuth: 'null',
        
        fileName: null,
        fileSize: null,
        isUpload: false,
        
        originFile: null,
        isAgree: null,

        PreProcessFile: null,
        PreProcessCode: '',
        isPreProcessOK: false,
        
        FeatureFile: null,
        FeatureCode: '',
        isFeatureOK: false,
        level: 3,
        logData: null
    };

    componentDidMount() {
        let self = this;
        axios.post('/naver/csrf', { token: cookie.load('classfit')})
            .then(function (response) {
                if (response.data.result === 'success') {
                    self.setState({csrfAuth: 'true'});
                }
                else {
                    self.setState({csrfAuth: 'false'});
                    alert('로그인이 필요한 서비스입니다.');
                }
            })
            .catch(function (error) {
                alert('오류 : ' + error);
            });
    }

    dragOver = (e) => {
        e.preventDefault();
    }

    dragEnter = (e) => {
        e.preventDefault();
    }

    dragLeave = (e) => {
        e.preventDefault();
    }

    fileDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files;
        if (file.length) {
            this.checkFile(file[0]);
        }
    }

    checkFile = (file) => {
        let size = file.size;
        let string = file.name;
        let ext = string.split('.');
        let last = (ext.length) - 1;

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        size = parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];

        if (ext[last] === 'py') {
            this.setState({fileName: string, fileSize: size, isUpload: true, FeatureFile: file});
        }
        else {
            alert('.py 파일이 아닙니다.');
        }
    }

    removeFile = () => {
        this.setState({
            fileName: null,
            fileSize: null,
            isUpload: false,
            PreProcessFile: null
        });
    }

    verification = async () => {
        let self = this;
        if (this.state.isUpload === true && this.state.FeatureCode !== '') {
            alert('특징추출 코드 혹은 특징추출 코드가 담긴 파일 중 하나를 등록해주세요.');
        }
        else if (this.state.isUpload === true && this.state.FeatureCode === '') {

            const formData = new FormData();
            formData.append('file', this.state.FeatureFile);

            //파일 검증
            await axios.post('/auth/file', formData)
                    .then(function(response) {
                        if (response.data.result === 'success') {
                            self.setState({isFeatureOK: true, logData: response.data.logData});
                            alert('검증이 완료되었습니다.');
                        }
                        else {
                            alert('파일 검증에 실패하였습니다.');
                        }
                    })
                    .catch(function(error) {
                        alert('파일 검증 오류 : ' + error);
                    });
        }
        else if (this.state.isUpload === false && this.state.FeatureCode !== '') {
            
            //코드 검증
            await axios.post('/auth/code', {code: this.state.FeatureCode})
                    .then(function(response) {
                        if (response.data.result === 'success') {
                            self.setState({isFeatureOK: true});
                            alert('검증이 완료되었습니다.');
                        }
                        else {
                            alert('코드 검증에 실패하였습니다.');
                        }
                    })
                    .catch(function(error) {
                        alert('코드 검증 오류 : ' + error);
                    });
        }
        else if (this.state.isUpload === false && this.state.FeatureCode === '') {
            this.setState({isFeatureOK: false});
            alert('전처리 코드 혹은 파일을 등록해주세요.');
        }
        else {
            alert('오류가 발생하였습니다.');
        }
    }

    nextLevel = (e) => {
        if (this.state.isFeatureOK === false) {
            e.preventDefault();
            alert('코드 및 파일 검증이 필요합니다.');
        }
        else {
            if (this.state.FeatureCode === '' && this.state.FeatureFile === null) {
                e.preventDefault();
                this.setState({isFeatureOK: false});
                alert('재검증이 필요합니다.');
            }
            else {
                return true;
            }
        }
    }

    render() {

        let fileZoneText = <span className="PreProcessDropZoneDefaultText textColorWhite">.py 파일을 이곳에 끌어다 놓으세요.</span>;

        if (this.state.isUpload === true) {
            fileZoneText = <span onClick={this.removeFile} className="PreProcessDropZoneUploadText">{this.state.fileName}</span>;
        }

        if (this.state.csrfAuth === 'true') {
            return (
                <Fragment>
                    <ProgressMenu origin={this.props.location.dataPreProcess.origin} level={this.state.level} />
                    <div className="warningTextFrame">
                        <div className="warningText1">
                            ※ 특징추출 코드 혹은 특징추출 코드가 담긴 파일 중 하나를 추가해주세요.
                        </div>
                        <div className="wariningTextMiddle"></div>
                        <div className="warningText2">
                            ※ 파일을 제거하려면 영역을 클릭하세요.
                        </div>
                    </div>
                    <div className="PreProcessFrame">
                        <div className="fl-l Editor">
                            <CodeMirror className="CodeMirror"
                                value={this.state.FeatureCode}
                                options={{
                                  mode: 'python',
                                  theme: 'monokai',
                                  lineNumbers: true
                                }}
                                onChange={(editor, data, value) => {
                                    this.setState({FeatureCode: value});
                                }}
                            />
                        </div>
                        <div className="fl-r PreProcessSub">
                            <div className="PreProcessAside">
                                <div className={this.state.isUpload === true ? "PreProcessFileZone fl-l borderOn" : "PreProcessFileZone fl-l borderOff"}
                                    onDragOver={this.dragOver}
                                    onDragEnter={this.dragEnter}
                                    onDragLeave={this.dragLeave}
                                    onDrop={this.fileDrop}
                                >
                                    {fileZoneText}
                                </div>
                                <div className="PreProcessButtonZone fl-r">
                                    <div onClick={this.verification} className="PreProcessNextButton ActionButton mgbt-12p">검증</div>
                                    <Link onClick={this.nextLevel} className="PreProcessNextButton ActionButton buttonNone"
                                    to={{
                                        pathname: '/AIStart',
                                        dataFeature: {
                                            isAgree: this.props.location.dataPreProcess.isAgree,
                                            originFile: this.props.location.dataPreProcess.originFile,
                                            PreProcessFile: this.props.location.dataPreProcess.PreProcessFile,
                                            PreProcessCode: this.props.location.dataPreProcess.PreProcessCode,
                                            isPreProcessOK: this.props.location.dataPreProcess.isPreProcessOK,
                                            FeatureFile: this.state.FeatureFile,
                                            FeatureCode: this.state.FeatureCode,
                                            isFeatureOK: this.state.isFeatureOK,
                                            origin: this.props.location.dataPreProcess.origin,
                                            usedFeature: this.props.location.dataPreProcess.usedFeature,
                                            usedAlgorithm: this.props.location.dataPreProcess.usedAlgorithm
                                        }
                                    }}>분석 시작</Link>
                                </div>
                            </div>
                            <div className="PreProcessOutput">
                                <div className="OutputTitle">검증 결과</div>
                                <div className="OutputContent">
                                    {this.state.isFeatureOK === true ? this.state.logData : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            );
        }
        else if (this.state.csrfAuth === 'false') {
            return (
                <Redirect to="/LogIn" />
            );
        }
        else {
            return null;
        }
    }

}

export default Feature;