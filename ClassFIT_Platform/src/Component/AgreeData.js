import React, { Component, Fragment } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import '../App.css';
import { Redirect, Link } from 'react-router-dom';

class AgreeData extends Component {

    state = {
        csrfAuth: 'null',
        isAgree: false
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

    render() {
        if (this.state.csrfAuth === 'true') {
            return (
                <Fragment>
                    <div className="AgreePageTitle">
                        <div className="AgreePageTitleDetail">'Classfit'</div>에서 정보보안 데이터 이용을 동의하십니까?
                    </div>
                    <div className="AgreePageFrame">
                        <div className="AgreePageContents">
                            <div className="AgreePageSubTitle">Classfit Platform 사용권 계약 동의서 부록</div>
                            <div>본 동의서 부록('부록')은 GCP 계약의 부록이며, Google과 본 약관에 동의하는 법인('고객') 간에 작성되고 체결됩니다. 본 부록은 고객이 특정 프로젝트에 대한 Cloud Talent Solution 데이터 로깅 옵션 사용을 동의(본 부록을 관련 '이용약관'으로 참조하는데 동의)하기 위해 클릭한 날짜에 해당 특정 프로젝트에 대해 효력을 갖습니다. 고객을 대신하여 동의하는 경우, 귀하는 (i) 고객이 본 부록에 구속되는 완전한 법적 권한이 귀하에게 있고, (ii) 귀하가 본 부록의 내용을 읽고 이해했으며, (iii) 귀하가 고객을 대신하여 본 부록에 동의한다는 점을 진술하고 보증합니다. 귀하에게 고객을 구속할 법적 권한이 없으면 프로젝트에 대한 Cloud Talent Solution 데이터 로깅 옵션 사용을 동의하지 마세요. 본 부록의 약관은 변경될 수 있습니다. Cloud Talent Solution 데이터 로깅 옵션을 사용하기 전에 약관을 주의 깊게 검토하세요.</div>

                            <div>본 부록에 정의되지 않은 굵게 표시된 용어는 GCP 계약에서 사용된 용어와 동일한 의미를 갖습니다.</div>
                            <br></br>
                            <div className="AgreePageSubTitle">데이터 사용</div>
                            <div><div className="AgreePageTestDetail">개요.</div> 고객은 Google이 Google의 머신러닝 기술('목적')을 개발, 개선 및 모델링할 수 있도록 고객 학습 데이터를 Google에게 제공합니다.</div>
                            <br></br>
                            <div><div className="AgreePageTestDetail">권한 부여.</div> 고객은 해당 목적으로 고객 학습 데이터를 사용, 식별 방지, 복사할 수 있는 영구적이고 취소 불가능한 권리를 Google에게 부여합니다.</div>
                            <br></br>
                            <div><div className="AgreePageTestDetail">동의.</div> 고객은 Google이 기밀유지 협약에 구속되는 Google 계열사, 제3자 공급업체, 계약업체와 고객 학습 데이터를 공유하는 데 동의합니다.</div>
                            <br></br>
                            <div><div className="AgreePageTestDetail">동의 철회.</div> 고객이 특정 프로젝트의 Cloud Talent Solution 데이터 로깅 옵션 사용을 동의하면 관련 사용자 인터페이스에 '데이터 로깅 사용 중지' 옵션('사용 중지 옵션')이 표시됩니다. 고객이 해당 특정 프로젝트에서 데이터 로깅을 더 이상 원치 않는 경우 고객은 프로젝트에 대한 '사용 안 함 옵션'을 선택해야 합니다(참고: 해당 프로젝트에 대한 사용 안 함 옵션을 선택하기 전에 프로젝트에서 기록된 고객 학습 데이터는 Google에서 계속 보관되며, 데이터 로깅 옵션이 계속 설정된 상태로 있는 다른 프로젝트에서는 고객 학습 데이터 로깅이 계속 진행됨).</div>
                            <br></br>
                            <div><div className="AgreePageTestDetail">보관.</div> GCP 계약에 위배되는 경우에도 불구하고 Google은 고객 학습 데이터를 무기한 보관할 수 있습니다. 고객이 Google에서 보관되는 집계되지 않은 고객 학습 데이터 삭제를 요청하면 해당 요청이 Cloud Talent Solution 서비스 내 개별 데이터 또는 프로젝트 삭제 요청으로 실행되어야 합니다.</div>
                            <br></br>
                            <div><div className="AgreePageTestDetail">존속.</div> 본 부록에서 고객이 부여한 권리는 GCP 계약의 해지 또는 만료 후에도 효력을 유지합니다.</div>
                            <br></br>
                            <div><div className="AgreePageTestDetail">개인정보.</div> 고객 학습 데이터에 개인 정보가 포함되는 경우 Google은 고객에게 Google 개인정보처리방침에 따라 데이터가 처리될 것임을 알립니다.</div>
                            <br></br>
                            <div><div className="AgreePageTestDetail">소유권.</div> Google은 여기에 동의된 대로 Google이 고객 데이터를 사용함으로써 발생하는 모든 모델, GCP 서비스 개선, 관련 지적 재산권을 소유합니다.</div>
                            <br></br>
                            <div className="AgreePageSubTitle">보증</div>
                            <div><div className="AgreePageTestDetail">고객 데이터.</div> 고객은 해당하는 경우 데이터 작성자 또는 소유자로부터의 서면 또는 사용 설정 권한 부여 또는 그러한 데이터 작성자 또는 소유자에게 관련 고지 또는 정보의 제공을 포함하여 여기에 명시된 동의를 부여하는 데 필요한 모든 적절한 권리, 동의, 권한이 자신에게 있음을 진술하고 보증합니다. 고객은 또한 (i) 고객 학습 데이터가 부모의 동의와 관계없이 아동 온라인 개인정보 보호법의 적용을 받는 13세 미만의 어린이의 또는 그러한 어린이를 대상으로 하는 웹사이트 또는 온라인 서비스(모바일 앱 포함)에서 얻은 것이 아니고, (ii) 고객이 HIPAA에 따라 PHI 의무에 관한 BAA를 Google과 체결하지 않았음을 진술하고 보증합니다.</div>
                            <br></br>
                            <div><div className="AgreePageTestDetail">배상.</div> 당사자는 GCP 계약의 고객 데이터와 관련된 고객의 배상 의무가 고객 학습 데이터로 인해 발생하는 Google의 배상 책임에 적용된다는 데 동의합니다.</div>
                            <br></br>
                            <div className="AgreePageSubTitle">일반</div>
                            <div>대행 관계없음 당사자 간에 대행 관계, 파트너십 또는 합작 관계가 형성되지 않습니다. 본 부록은 GCP 계약에 명시된 것과 같은 준거법의 규제를 받습니다.</div>
                            <br></br>
                            <div><div className="AgreePageTestDetail">추가 약관.</div> GCP 계약의 이용약관이 본 부록에 통합되어 있습니다. 본 부록의 주제와 관련하여 GCP 계약의 약관과 본 부록의 약관이 충돌하는 경우 본 부록이 우선시됩니다.</div>
                        </div>
                    </div>
                    <div className="AgreePageButtonFrame">
                        <div>
                            <Link className="AgreePageButtonLeft ActionButton fl-l buttonNone" to={{
                                pathname: '/AddData',
                                dataAgree: {
                                    origin: this.props.location.origin,
                                    isAgree: true
                                }
                            }}>동의합니다.</Link>
                        </div>
                        <div>
                            <Link className="AgreePageButtonRight ActionButton fl-r buttonNone" to="/Home">동의하지 않습니다.</Link>
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

export default AgreeData;
