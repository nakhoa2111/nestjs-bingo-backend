export default class GameManager {
  private static instance: GameManager = new GameManager();
  private numberQueue: number[] = [];

  private constructor() {
    GameManager.instance = this;
  }

  static getInstance(): GameManager {
    return GameManager.instance;
  }

  getNumberQueue(): number[] {
    return this.numberQueue;
  }

  generateNumber(): number {
    let number = 0;
    do {
      number = Math.floor(Math.random() * (75 - 1) + 1);
    } while (this.numberQueue.includes(number));
    this.numberQueue.push(number);
    return number;
  }

  isFullNumberQueue(): boolean {
    return this.numberQueue.length === 75;
  }
}
