import actionsData from './actions.json'

export type Action = {
  name: string
  categories: string[]
}

export class ActionModel {
  private actions: Action[]
  
  constructor() {
    this.actions = actionsData as Action[]
  }
  
  getRandomAction(): Action {
    const randomIndex = Math.floor(Math.random() * this.actions.length)
    return this.actions[randomIndex]
  }
  
  getActionCount(): number {
    return this.actions.length
  }
  
  getActionsByCategory(category: string): Action[] {
    return this.actions.filter(action => 
      action.categories.includes(category)
    )
  }
  
  getAllCategories(): string[] {
    const categories = new Set<string>()
    this.actions.forEach(action => {
      action.categories.forEach(cat => categories.add(cat))
    })
    return Array.from(categories)
  }
}