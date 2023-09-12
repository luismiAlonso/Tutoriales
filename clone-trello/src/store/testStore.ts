import { create } from "zustand"
 
interface Itest {
    tests: string[];
    setTest: (newTest: string[]) => void;
    getTest: () => string[]
  }
  
export const useTestStore = create<Itest>((set,get) => ({
    tests: [],
    setTest: (newTest:string[]) => { 
         set({tests: newTest })
        },
    getTest: ()=>{
        return  get().tests
    }
  }));