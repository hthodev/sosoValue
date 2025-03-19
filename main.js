import fs from "fs/promises";
import { HttpsProxyAgent } from "https-proxy-agent";
import fetch from "node-fetch";
import { jwtDecode } from "jwt-decode";
import { resolve } from "path";
const headers = {
  accept: "application/json, text/plain, */*",
  "accept-language": "en",
  "content-type": "application/json;charset=UTF-8",
  origin: "https://sosovalue.com",
  priority: "u=1, i",
  referer: "https://sosovalue.com/",
  "sec-ch-ua": `"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"`,
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "Windows",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "user-device": "Chrome/131.0.0.0#Windows/10",
};


async function getTasks(token, agent) {
	headers.Authorization = `Bearer ${token}`;
	const url = "https://gw.sosovalue.com/task/task-config-do/v1/queryTaskList"
	const options = {
    method: "POST",
    headers,
    agent,
    body: JSON.stringify({
      activityType: 0,
    }),
  };
	
	const response = await fetch(url, options);
	const data = await response.json().catch(() => ({}));
	
	if (data.code === 0) {
    const tasks = []
    data.data.growthTaskList.forEach(task => {
      if ( task.taskStatus === 0) tasks.push({ taskId: task.id, taskKey: task.taskKey })
    })
    data.data.noviceTaskList.forEach(task => {
      if ( task.taskStatus === 0) tasks.push({ taskId: task.id, taskKey: task.taskKey })
    })
		return tasks
	}
	console.log("Không có task");
	return []
}

async function changeStatus(taskId, token, agent) {
	headers.Authorization = `Bearer ${token}`;
  const url = "https://gw.sosovalue.com/task/task/support/changeTaskStatus";
  const options = {
    method: "POST",
    headers,
    agent,
    body: JSON.stringify({
      activityType: 0,
      targetTaskStatus: 2,
      taskId,
    }),
  };
  await fetch(url, options);
}

async function verify(typeTask, token, agent) {
	headers.Authorization = `Bearer ${token}`;
  if (typeTask === "EXP_WATCH_DAILY_NEWS") {
		console.log("Đang thực hiện verify xem youtube!");
    const url =
      "https://gw.sosovalue.com/task/task/support/daily/other/complete/0/EXP_WATCH_DAILY_NEWS";
    const options = {
      method: "POST",
      headers,
      agent,
    };
    const response = await fetch(url, options);
		const data = await response.json().catch(() => ({}));
		if (data?.code === 0) {
			console.log("Verify thành công youtube!");
		}
  }
  if (typeTask === "TWITTER_DAILY_POST") {
		console.log("Đang thực hiện verify share x!");
    const url =
      "https://gw.sosovalue.com/task/task/support/twitter/verify/TWITTER_DAILY_POST/1575548590541262848";
    const options = {
      method: "GET",
      headers,
      agent,
    };
    const response = await fetch(url, options);
		const data = await response.json().catch(() => ({}));
		if (data?.code === 0) {
			console.log("Verify share x thành công!");
		}
  }
  if (typeTask === "EXP_TWITTER_DAILY_LIKE") {
		console.log("Đang thực hiện verify like x!");
    const url =
      "https://gw.sosovalue.com/task/task/support/daily/other/complete/0/EXP_TWITTER_DAILY_LIKE";
    const options = {
      method: "POST",
      headers,
      agent,
    };
    const response = await fetch(url, options);
		const data = await response.json().catch(() => ({}));
		if (data?.code === 0) {
			console.log("Verify like x thành công!");
		}
  }

  if (typeTask === 'INSTALL_PWA_PC') {
    console.log("Đang thực hiện install PC!");
    const url =
      "https://gw.sosovalue.com/task/task/support/complete/pwa";
    const options = {
      method: "POST",
      headers,
      agent,
      body: JSON.stringify({
        "host": "sosovalue.com",
        "pwaType": "PC_PWA"
      })
    };
    const options2 = {
      method: "POST",
      headers,
      agent,
      body: JSON.stringify({
        "host": "sosovalue.com",
        "pwaType": "PC_COM_PWA"
      })
    }
    const response = await fetch(url, options);
		const data = await response.json().catch(() => ({}));
    const response2 = await fetch(url, options2);
		const data2 = await response2.json().catch(() => ({}));

		if (data?.code === 0 && data2?.code === 0) {
			console.log("Install PC thành công!");
		}
  }

  if (typeTask === 'INSTALL_PWA_MOBILE') {
    console.log("Đang thực hiện install Mobile!");
    const url =
      "https://gw.sosovalue.com/task/task/support/complete/pwa";
    const options = {
      method: "POST",
      headers,
      agent,
      body: JSON.stringify({
        "host": "sosovalue.com",
        "pwaType": "MOBILE_PWA"
      })
    };
    const options2 = {
      method: "POST",
      headers,
      agent,
      body: JSON.stringify({
        "host": "sosovalue.com",
        "pwaType": "MOBILE_COM_PWA"
      })
    }
    const response = await fetch(url, options);
		const data = await response.json().catch(() => ({}));
    const response2 = await fetch(url, options2);
		const data2 = await response2.json().catch(() => ({}));

		if (data?.code === 0 && data2?.code === 0) {
			console.log("Install Mobile thành công!");
		}
  }

  if (typeTask === 'EXP_SUBSCRIBE_TO_YOUTUBE_CHANNEL') {
    console.log("Đang thực hiện subscribe Youtube chanel!");
    const url =
      "https://gw.sosovalue.com/task/task/support/checkJumpLink";
    const options = {
      method: "POST",
      headers,
      agent,
      body: JSON.stringify({
        "activityType": 0,
        "taskId": "1815632927891689997"
      })
    };

    const response = await fetch(url, options);
		const data = await response.json().catch(() => ({}));

		if (data?.code === 0) {
			console.log("Subscribe Youtube chanel thành công!");
		}
  }

}

async function daily(token, agent) {
  headers.Authorization = `Bearer ${token}`;
  const url =
    "https://gw.sosovalue.com/usercenter/user/updateLoginStatus";
  const options = {
    method: "PUT",
    headers,
    agent,
  };
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));
  if (data?.code === 0) {
    console.log("Daily hằng ngày thành công!");
  } else {
    console.log("Lỗi daily hằng ngày!");
  }
}

async function getUserInfo(token, agent) {
  headers.Authorization = `Bearer ${token}`;
  const url =
    "https://gw.sosovalue.com/authentication/user/getUserInfo";
  const options = {
    method: "GET",
    headers,
    agent,
  };
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));
  const response2 = await fetch('https://gw.sosovalue.com/rights/equity/rab-exp-info/getUserExe', {
    method: "GET",
    headers,
    agent,
  })
  const data2 = await response2.json().catch(() => ({}));

  if (data?.code === 0) {
    return {
      email: data.data.email || 'Bạn đăng nhập bằng google nên không tìm thấy email',
      invitationCode: data.data.invitationCode || 'Không có ai mời bạn',
      exp: data2?.data?.currentExp || 0,
      level: data2?.data?.level || 0
    }
  } else {
    console.log("Lỗi lấy thông tin user!");
  }
}

async function main() {
  while(true) {
    const tokenStr = await fs.readFile("tokens.txt", "utf-8");
    const tokens = tokenStr.trim().split("\n");
    const proxyStr = await fs.readFile("proxies.txt", "utf-8");
    const proxies = proxyStr.trim().split("\n");
    let level1 = 0
  
    for (let i = 0; i < tokens.length; i++) {
      try {
        console.log("Xử lý account", i + 1);
        let currentToken = tokens[i].trim();
        const currentProxy = proxies[i];
        const decoded = jwtDecode(currentToken);
        
        if (decoded.exp * 1000 <= (new Date()).getTime()) {
          console.log("token đã hết hạn, cần lấy token mới");
          continue
        }
        const agent = new HttpsProxyAgent(currentProxy);
        const userInfo = await getUserInfo(currentToken, agent)
        if (userInfo) {
          console.log("Email tài khoản đang xử lý: ", userInfo.email);
          console.log("Mã code người đã mời bạn: ", userInfo.invitationCode);
          console.log("Tổng exp: ", userInfo.exp);
          console.log("Level hiện tại: ", userInfo.level);
          if (userInfo.level > 0) {
            level1++
          }
        }
        await daily(currentToken, agent);
    
        const tasks = await getTasks(currentToken, agent);
        console.log("Task hôm nay", tasks);
        
        if (tasks.length) {
          const taskIds = tasks.map(task => task.taskId);
          const taskKeys = tasks.map(task => task.taskKey);			
          const queues = taskIds.map(taskId => changeStatus(taskId, currentToken, agent))
          await Promise.all(queues);
          console.log("Đợi 1 phút");
          await new Promise(resolve => setTimeout(resolve, 65 *1000))
          const verifyQueues = taskKeys.map(taskKey => verify(taskKey, currentToken, agent))
          await Promise.all(verifyQueues);
        }
      } catch (error) {
        console.log(error);
      }
    }
    console.log("Đã hoàn thành tất cả task");
    console.log("Đợi 1 ngày")
    console.log("Số lượng level 1", level1);
    
    await new Promise(resolve => setTimeout(resolve, 24 * 60 * 60 * 1000))
  }
}

main()
