import { User } from '../../models';

// ========== 유저 목록
export const list = async (req, res) => {
  if (!req.decoded.admin) {
    return res.status(403).json({
      error: true,
      message: '권한이 없습니다.',
    });
  }
  try {
    const userList = await User.find({});
    console.log(userList);
    res.json({
      error: false,
      data: userList,
    });
  } catch (e) {
    // console.log(e);
    res.status(500).json({
      error: true,
      message: '유저 목록 조회에 실패 하였습니다..',
    });
  }
};

// ========== 관리자로 권한 변경.
export const assignAdmin = async (req, res) => {
  const { username } = req.params;
  if (!req.decoded.admin) {
    return res.status(403).json({
      error: true,
      message: '권한이 없습니다.',
    });
  }
  // 이름을 입력하지 않았을 경우.
  if (!username) {
    return res.status(400).json({
      error: true,
      message: '이름을 입력해 주십시요.',
    });
  }

  try {
    const targetUser = await User.findOneByUsername(username);
    const result = await targetUser.assignAdmin();
    console.log(result);
    res.json({
      error: false,
      success: true,
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      message: '정보를 찾는데 실패 하였습니다.',
    });
  }
};
