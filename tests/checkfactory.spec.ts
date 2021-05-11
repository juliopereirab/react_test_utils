import * as Factory from "factory.ts";
import { Replicator } from "../helpers/helpers";

interface Person{
    id: number,
    firstName: string,
    lastName: string,
    fullName: string,
    age: number
}

const personFactory = Factory.Sync.makeFactory<Person>({
  id: Factory.each(i => i),
  firstName: "Bob",
  lastName: "Smith",
  fullName: "Robert J. Smith, Jr.",
  age: Factory.each(i => 20 + (i % 10))
});

const replica = new Replicator<Person>({
    id: 1,
    firstName: "Bob",
    lastName: "Smith",
    fullName: "Robert J. Smith, Jr.",
    age: 20
}, ["id", "age"]);

describe("checking facotryts", () => {
    test("check factory", () => {



        expect(replica.getCopy({ age: 5 }).age).toBe(5);

        let bunch = replica.getBunch(8, { lastName: "Brady" });

        expect(bunch.length).toBe(8);

        // expect(personFactory.build({ age: 5 }).age).toBe(5);

        // let bunch = personFactory.buildList(8, { lastName: "Brady" });
        // console.log("bunch", bunch);

        // expect(bunch.length).toBe(8);

    })
})