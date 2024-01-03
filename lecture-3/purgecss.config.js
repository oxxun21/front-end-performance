module.exports = {
  defaultExtractor: (content) => content.match(/[\w\:\-]+/g) || [],
};

// purgecss 에서 콜론(:)과 하이픈(-)도 인식하여 키워드를 추출하도록 옵션 설정
