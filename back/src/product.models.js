const knex = require("../knex");

/**
 * テーブル名称productsを代入
 */
const PRODUCT_TABLE = "products";

module.exports = {
  /**
   *
   * @returns {promise}productテーブルの中身を全て取得
   */
  async getAll() {
    return await knex.select("*").from(PRODUCT_TABLE).orderBy("id", "asc");
  },
  /**
   *
   * @param {number} 変更するデータのidを引数として受け取る
   * @param {string} 変更するデータ（コメント）を受けとる
   */
  async update(id, comment, status) {
    knex(PRODUCT_TABLE)
      .where("id", "=", id)
      .update({ comment: comment, isWaiting: status })
      .then((data) => data);
  },
};
