# BEMS-HDMS / sensor-test-page

BEMS-HDMS 개발을 진행하면서 센서 파트는 아직 개발이 완전히 되지 않았기 때문에 센서에서 들어오는 데이터가 존재하지 않았다. 하지만 센서와 BackEnd 서버 간에 암호화 통신이 어떻게 진행되는 지 확인해봤어야 했고, Sensor로부터 Body에 담길 Data Format을 정해주어야 했다. 그래서 Sensor 대신에 웹 페이지 상에 interval 함수를 걸어 실제 Sensor와 같이 초 간격마다 데이터를 수집하여 요청하는 웹 페이지를 개발하였다.

![Untitled](https://user-images.githubusercontent.com/52296323/176595196-dedafddb-c847-499d-a712-520fe0416f3a.png)
