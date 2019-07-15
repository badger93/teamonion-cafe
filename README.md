# **tmong-intern**

<br/>
TeaMONion 팀 인턴 프로젝트
<br/>
티몽 주문시스템 만들기
<br/>
## **branch convention**
<br/>
---
<br/>
### 1. 분기 **master → develop**
<br/>
- 개발목표 설정 후 delvelop으로 분기
 <br/>
### 2. 분기 **develop → 직군-기능-업무 ( ex) FE-login-init )**
<br/>
- develop 브랜치에서 기능별로 브랜치 분기해서 작업
- 각자 알아서 커밋
<br/>
### 3. 머지  **직군-기능-업무 → develop**
<br/>
- develop 으로 PR(Pull Request) 날리기
- reviewer는 팀원 전체 or FE/BE 멤버를 포함 할 것
<br/>
### 4. 머지  **develop → master**
<br/>
- 개발목표 완수 후 develop에서 master로 머지
<br/>
### 5. 분기 master → release
<br/>
- 빌드 결과물이 위치하게 됨
- FE 빌드 → BE source와 병합 → BE 빌드
