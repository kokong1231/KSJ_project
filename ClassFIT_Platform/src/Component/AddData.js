import React, { Component, Fragment } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import '../App.css';
import { Redirect, Link } from 'react-router-dom';
import ProgressMenu from './ProgressMenu';

class AddData extends Component {

    state = {
        csrfAuth: 'null',
        isUpload: false,
        fileByButton: React.createRef(),
        fileName: null,
        fileSize: null,
        
        originFile: null,
        isAgree: null,
        level: 1,
        usedFeature: null,
        usedAlgorithm: null
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

        if (ext[last] === 'csv' || ext[last] === 'txt' || ext[last] === 'json' ||
            ext[last] === 'jsonl' || ext[last] === 'pkl' || ext[last] === 'pickle') {
            this.setState({fileName: string, fileSize: size, isUpload: true, originFile: file});
        }
        else {
            alert('확장자가 맞지 않습니다.');
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        const file = this.state.fileByButton.current.files[0];
        if (file.size) {
            this.checkFileByButton(file);
        }
    }

    checkFileByButton = (file) => {
        let size = file.size;
        let string = file.name;
        let ext = string.split('.');
        let last = (ext.length) - 1;

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        size = parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];

        if (this.props.location.dataAgree.origin === 'labeling') {
            if (ext[last] === 'csv' || ext[last] === 'txt') {
                this.setState({fileName: string, fileSize: size, isUpload: true, originFile: file});
            }
            else {
                alert('확장자가 맞지 않습니다.');
            }
        }
        else if (this.props.location.dataAgree.origin === 'AI') {
            if (ext[last] === 'pkl' || ext[last] === 'pickle') {
                this.setState({fileName: string, fileSize: size, isUpload: true, originFile: file});
            }
            else {
                alert('확장자가 맞지 않습니다.');
            }
        }
        else {
            alert('알 수 없는 오류가 발생하였습니다.');
        }
    }

    nextLevel = (e) => {
        if (this.props.location.dataAgree.origin === 'labeling') {
            if (this.state.isUpload === false) {
                e.preventDefault();
                alert('파일을 추가해주세요.');
            }
            else {
                return true;
            }
        }
        else if (this.props.location.dataAgree.origin === 'AI') {
            if (this.state.isUpload === false) {
                e.preventDefault();
                alert('파일을 추가해주세요.');
            }
            else if (this.state.usedFeature === null) {
                e.preventDefault();
                alert('사용한 특징을 입력하세요.');
            }
            else if (this.state.usedAlgorithm === null) {
                e.preventDefault();
                alert('사용한 알고리즘을 입력하세요.');
            }
            else {
                return true;
            }
        }
        else {
            alert('알 수 없는 오류가 발생하였습니다.');
        }
    }

    featureTextChange = (e) => {
        this.setState({usedFeature: e.target.value});
    }

    algorithmTextChange = (e) => {
        this.setState({usedAlgorithm: e.target.value});
    }

    /*
    fileSubmit = async () => {

        if (this.state.file !== null) {
            const formData = new FormData();
            formData.append('file', this.state.originFile);

            const req = await axios.post('/file/upload', formData)
                        .then(res => {
                            if (res.data.result === 'success') {
                                alert('파일 업로드를 완료하였습니다.');
                            }
                            else if (res.data.result === 'fail') {
                                alert('파일 업로드 중 서버에서 오류가 발생하였습니다.');
                            }
                        })
                        .catch(err => {
                            alert('파일 업로드 중 오류가 발생하였습니다.');
                            console.log('오류 : ' + err);
                        });
        }
        else {
            alert('업로드 된 파일이 없습니다.');
        }
    }
    */
   
    render() {
        let content = null;

        if (this.props.location.dataAgree.origin === 'labeling') {
            content =
            <div>
                <div className="DropZoneDefaultText">파일을 추가하려면 이곳에 파일을 끌어다 놓으세요.</div>
                <div className="DropZoneDefaultText">※ 업로드 가능한 확장자는 csv, txt 입니다.</div>
            </div>;
        }
        else {
            content = 
            <div>
                <div className="DropZoneDefaultText">파일을 추가하려면 이곳에 파일을 끌어다 놓으세요.</div>
                <div className="DropZoneDefaultText">※ 업로드 가능한 확장자는 pkl, pickle 입니다.</div>
            </div>;
        }

        if (this.state.isUpload === true) {
            content = <div className="DropZoneUploadText">{this.state.fileName}</div>;
        }

        if (this.state.csrfAuth === 'true') {
            if (this.props.location.dataAgree.origin === 'AI') {
                return (
                    <Fragment>
                        <ProgressMenu origin={this.props.location.dataAgree.origin} level={this.state.level} />
                        <div className="DropZoneView">
                            <div className="fl-l DropZoneLeft">
                                <div className="UsedFrame">
                                    <p>사용한 특징</p>
                                    <div>
                                        <input className="UsedInput" onChange={this.featureTextChange} type="text" placeholder="특징을 입력하세요." autoFocus></input>
                                    </div>
                                </div>
                                <div className="UsedFrame">
                                    <p>사용한 알고리즘</p>
                                    <div>
                                        <input className="UsedInput" onChange={this.algorithmTextChange} type="text" placeholder="알고리즘을 입력하세요."></input>
                                    </div>
                                </div>
                            </div>
                            <div className={this.state.isUpload === true ? "DropZone borderOn" : "DropZone borderOff"}
                                onDragOver={this.dragOver}
                                onDragEnter={this.dragEnter}
                                onDragLeave={this.dragLeave}
                                onDrop={this.fileDrop}
                            >
                                {content}
                            </div>
                        </div>
                        <div className="DropZoneSub ml-45vw">
                            <span className="fl-l FileSizeText">{this.state.isUpload === true ? this.state.fileSize : null}</span>
                            <label htmlFor="file"><div className="FileUploadButton fl-r">파일 찾기</div></label>
                            <input type="file" id="file" ref={this.state.fileByButton} className="hidden" onChange={this.handleChange}></input>
                        </div>
                        <div className="AddDataButtonFrame">
                            <Link onClick={this.nextLevel} className="AddDataButton ActionButton buttonNone"
                            to={{
                                pathname: this.props.location.dataAgree.origin === 'AI' ? '/PreProcess' : '/LabelingStart',
                                dataAdd: {
                                    isAgree: this.props.location.dataAgree.isAgree,
                                    originFile: this.state.originFile,
                                    origin: this.props.location.dataAgree.origin,
                                    usedFeature: this.state.usedFeature,
                                    usedAlgorithm: this.state.usedAlgorithm
                                }
                            }}>{this.props.location.dataAgree.origin === 'labeling' ? '라벨링 시작' : '다음단계'}</Link>
                        </div>
                    </Fragment>
                );
            }
            else {
                return (
                    <Fragment>
                        <ProgressMenu origin={this.props.location.dataAgree.origin} level={this.state.level} />
                        <div className="DropZoneView">
                            <div className={this.state.isUpload === true ? "DropZone mg-vertical-auto borderOn" : "DropZone mg-vertical-auto borderOff"}
                                onDragOver={this.dragOver}
                                onDragEnter={this.dragEnter}
                                onDragLeave={this.dragLeave}
                                onDrop={this.fileDrop}
                            >
                                {content}
                            </div>
                        </div>
                        <div className="DropZoneSub">
                            <span className="fl-l FileSizeText">{this.state.isUpload === true ? this.state.fileSize : null}</span>
                            <label htmlFor="file"><div className="FileUploadButton fl-r">파일 찾기</div></label>
                            <input type="file" id="file" ref={this.state.fileByButton} className="hidden" onChange={this.handleChange}></input>
                        </div>
                        <div className="AddDataButtonFrame">
                            <Link onClick={this.nextLevel} className="AddDataButton ActionButton buttonNone"
                            to={{
                                pathname: this.props.location.dataAgree.origin === 'AI' ? '/PreProcess' : '/LabelingStart',
                                dataAdd: {
                                    isAgree: this.props.location.dataAgree.isAgree,
                                    originFile: this.state.originFile,
                                    origin: this.props.location.dataAgree.origin
                                }
                            }}>{this.props.location.dataAgree.origin === 'labeling' ? '라벨링 시작' : '다음단계'}</Link>
                        </div>
                    </Fragment>
                );
            }
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

export default AddData;